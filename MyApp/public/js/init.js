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
await getData()

function getData(){
  if(isLogged){
    let useCups = 0
    let plasticCupUsed = 0, reusableCupUsed = 0
    let discountAmount = 0, benefitAmount = 0
    
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
    console.log(useCups, plasticCupUsed, reusableCupUsed, discountAmount, benefitAmount)
    document.getElementById("cupA").innerText = plasticCupUsed + "개"
    document.getElementById("cupB").innerText = reusableCupUsed + "개"
    document.getElementById("amount_discount").innerText = discountAmount + "원"
    document.getElementById("amount_get").innerText = benefitAmount + "건"
  }
}

const getDataContent = await getDocs(collection(db, "User", Email, "UserCupCountMonth"));

if(isLogged){
  await updateDoc(updateDataContent, {
    plasticCount : currentMonth.currentPlasticCount,
    reusableCount : currentMonth.currentReusableCount
  })

  var append = []

  getDataContent.forEach((doc) => {
    var appendDiv = document.createElement("div");
    appendDiv.className = "history_cup_group"

    var getplasticCount = doc.data().plasticCount
    var getReusableCount = doc.data().reusableCount

    var getYear = doc.id.substr(0,4)
    var getMonth = doc.id.substr(4,2)



    appendDiv.innerHTML = `
    <p id="history_cup_month">${getYear}년 ${getMonth}월</p>
    <div class="history_cup_used" id="used_cupA">
      <div class="history_cup_used_bar" id="used_cupA_bar_${doc.id}"></div>
      <span id="used_cup">${getplasticCount}</span>
    </div>
    <div class="history_cup_used" id="used_cupB">
      <div class="history_cup_used_bar" id="used_cupB_bar${doc.id}"></div>
      <span id="used_cup">${getReusableCount}</span>
    </div>
    `;
    append.push([appendDiv, doc.id])
    console.log(append)
  })

  append.reverse().forEach(([div, id]) =>
  {
    document.getElementById("history_cup").appendChild(div)
    console.log(div, id)
  })
  
}






// var washingtonRef = doc(db, "User", "userTest@email.com", "UseCupHistory", "12345");

// // Set the "capital" field of the city 'DC'
// // await updateDoc(washingtonRef, {
// //   testtest : [124,14]
// // });

// //데이터 추가하기
// await setDoc(washingtonRef, {
//     testtest : [124,14]
//   });

// var washingtonRef = doc(db, "User", "y298rey2938r");

//             // Set the "capital" field of the city 'DC'
//             // await updateDoc(washingtonRef, {
//             //   testtest : [124,14]
//             // });

//             //데이터 추가하기
//             await setDoc(washingtonRef, {});

// var washingtonRef = doc(db, "User", "y298rey2938r", "UseCupHistory", "23456");

//             // Set the "capital" field of the city 'DC'
//             // await updateDoc(washingtonRef, {
//             //   testtest : [124,14]
//             // });

//             //데이터 추가하기
//             await setDoc(washingtonRef, { });