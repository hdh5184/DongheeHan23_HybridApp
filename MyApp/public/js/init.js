import { app } from "./firebase.js"
import { auth } from "./login.js"
import { db, storage } from "./database.js"
import { isLogged } from "./login.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL, listAll } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';
import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 


//데이터베이스를 통해 이미지 적용
const querySnapshot = await getDocs(collection(db, "ImageContent"));
querySnapshot.forEach((doc) => {
    var imageId = doc.data().id
    var imageSrc = doc.data().src
    var imageTag = doc.data().tag

    getDownloadURL(ref(storage, imageSrc)).then((url) => {
        if(imageTag == "img") document.getElementById(imageId).src = url
        else if(imageTag == "div") document.getElementById(imageId).style = `background-image: url(${url})`
      }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
});

if(!isLogged){
    getDownloadURL(ref(storage, "Image/LogIn.png")).then((url) => {
        document.getElementById("MyInfoImg").src = url
      }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
}

let Email

await onAuthStateChanged(auth, (user) => {
  if (user) {
    Email = user.email.toString()
    document.getElementById("userInfo").innerText = "이메일 : " + Email
  }
});

if(isLogged){
  var addUserContent = await getDocs(collection(db, "User", Email, "UseCupHistory"));
  var updateDate = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString()
  var updateDataContent = doc(db, "User", Email, "UserCupCountMonth", updateDate)
}

let currentMonth = {currentPlasticCount: 0, currentReusableCount: 0}

//나의 실천 보기 정보 가져오기 (집계)
let useCups = 0
let plasticCupUsed = 0, reusableCupUsed = 0
let discountAmount = 0, benefitAmount = 0

await getData()

function getData(){
  if(isLogged){
    
    addUserContent.forEach(async (doc) => {
      var date = new Date(doc.id)
      var current = date.getMonth() == new Date().getMonth()
      if(doc.data().benefit == "benefit") benefitAmount++
      else discountAmount += doc.data().discountValue
      
      if(doc.data().useCupType == "plastic") {
        if(current) currentMonth.currentPlasticCount++
        plasticCupUsed++
      }
      else {
        if(current) currentMonth.currentReusableCount++
        reusableCupUsed++
      }
  
      useCups++
    });
    document.getElementById("cupA").innerText = plasticCupUsed + "개"
    document.getElementById("cupB").innerText = reusableCupUsed + "개"
    document.getElementById("amount_discount").innerText = discountAmount + "원"
    document.getElementById("amount_get").innerText = benefitAmount + "건"
  }
}

//공유용 키워드 전달
const MyKeyword =
{
  reusable : reusableCupUsed,
  discount : discountAmount,
  benefit : benefitAmount
}
export {MyKeyword}


if(isLogged){
  //월간 컵 기록 업데이트
  try {
    await updateDoc(updateDataContent, {
      plasticCount : currentMonth.currentPlasticCount,
      reusableCount : currentMonth.currentReusableCount
    })
  } catch (error) {
    console.log("새로운 월간 기록")
    const signUpDate =
    new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString()

    var addUserContent = doc(db, "User", signUpEmail, "UserCupCountMonth", signUpDate);
    await setDoc(addUserContent, {
        plasticCount : 0,
        reusableCount : 0
    });
    await updateDoc(updateDataContent, {
      plasticCount : currentMonth.currentPlasticCount,
      reusableCount : currentMonth.currentReusableCount
    })
  }
  
  //나의 실천 보기 정보 가져오기 (그래프)
  var append = []
  const getDataContent = await getDocs(collection(db, "User", Email, "UserCupCountMonth"));

  getDataContent.forEach((doc) => {
    var appendDiv = document.createElement("div");
    appendDiv.className = "history_cup_group"

    var getplasticCount = doc.data().plasticCount
    var getReusableCount = doc.data().reusableCount

    var getYear = doc.id.substr(0,4)
    var getMonth = doc.id.substr(4,2)

    if(getplasticCount > getReusableCount){
      var plasticBarPercent = 90
      var ReusableBarPercent = (getReusableCount / getplasticCount) * 90
    }
    else{
      var ReusableBarPercent = 90
      var plasticBarPercent = (getplasticCount / getReusableCount) * 90
    }
    
    appendDiv.innerHTML = `
    <p id="history_cup_month">${getYear}년 ${getMonth}월</p>
    <div class="history_cup_used" id="used_cupA">
      <div class="history_cup_used_barA" id="used_cupA_bar_${doc.id}"
      style = "width : ${plasticBarPercent}%"></div>
      <span id="used_cup">${getplasticCount}</span>
    </div>
    <div class="history_cup_used" id="used_cupB">
      <div class="history_cup_used_barB" id="used_cupB_bar_${doc.id}"
      style = "width : ${ReusableBarPercent}%"></div>
      <span id="used_cup">${getReusableCount}</span>
    </div>
    `
    append.push(appendDiv)
  })

  append.reverse().forEach((div) =>
  {document.getElementById("history_cup").appendChild(div)})
}

//뉴스 정보 가져오기
var append = []
var benefit = []

const getNewsBenefit = await getDocs(collection(db, "NewsBenefit"));
getNewsBenefit.forEach((doc) => {
  var appendDiv = document.createElement("div");
  appendDiv.className = "news_content"
  appendDiv.id = `news_${doc.id}`
  appendDiv.style = doc.data().background

  var BenefitDate = doc.data().date
  var BenefitContent = doc.data().content

  appendDiv.innerHTML = `
  <div class="news_title">
    <p id="news_date">${BenefitDate}</p>
    <p id="news_title">${BenefitContent}</p>
    </div>
  <div class="news_img" id="${doc.id}"></div>
  `
  append.push(appendDiv)
  benefit.push(doc.data())
});

append.reverse().forEach((div) =>
{document.getElementById("news_div").appendChild(div)})

getNewsBenefit.forEach((doc) => {
  getDownloadURL(ref(storage, doc.data().src)).then((url) => {
    document.getElementById(doc.id).style = `background-image: url(${url})`
  }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
});

const benefitData = benefit
export { benefitData }

//이벤트 정보 가져오기
var append = []
var event = []

const getNewsEvent = await getDocs(collection(db, "NewsEvent"));
getNewsEvent.forEach((doc) => {
  var appendDiv = document.createElement("div");
  appendDiv.className = "event_content"
  appendDiv.id = `event_${doc.id}`
  appendDiv.style = doc.data().background

  var EventDate = doc.data().date
  var EventContent = doc.data().content

  appendDiv.innerHTML = `
  <div class="event_title">
      <p id="event_date">${EventDate}</p>
      <p id="event_title">${EventContent}</p>
  </div>
  `
  append.push(appendDiv)
  event.push(doc.data())
  
});

append.reverse().forEach((div) =>
{document.getElementById("event_div").appendChild(div)})

getNewsEvent.forEach((doc) => {
  getDownloadURL(ref(storage, doc.data().src)).then((url) => {
    document.getElementById(`event_${doc.id}`).style =
    `${doc.data().background} background-image: url(${url})`
  }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
});

const eventData = event
export { eventData }
