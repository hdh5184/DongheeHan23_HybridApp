
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCyWiKK9RJCOyDGIh-14YO99aYuNYa2yWM",
authDomain: "hybridapp2023-51592.firebaseapp.com",
projectId: "hybridapp2023-51592",
storageBucket: "hybridapp2023-51592.appspot.com",
messagingSenderId: "833940080458",
appId: "1:833940080458:web:9e2e96b553af1a04b2a3b3",
measurementId: "G-ZTGDE4QK0P"
};
        
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// db.collection('UseCup').get().then(()=>{
//     console.log("result")
// })

import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 

const washingtonRef = doc(db, "UseCup", "plasticCup");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  test : [124,14]
});


const querySnapshot = await getDocs(collection(db, "UseCup"));
querySnapshot.forEach((doc) => {
  //console.log(`${doc.id} => ${doc.data()}`);
  var array = doc.data().test
  //console.log(doc.data().test);
  console.log(array)
});

import { getStorage, ref, getDownloadURL, listAll } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';

var storage = getStorage(app)

var storageRef = ref(storage, 'Image');

// const imageContainer = document.getElementById('imageContainer');

// listAll(storageRef).then((result) => {
//   result.items.forEach((itemRef) => {
//     // 각 이미지에 대한 URL 가져오기
//     getDownloadURL(itemRef).then((url) => {
//       // 이미지를 화면에 표시
//       const imgElement = document.createElement('img');
//       imgElement.src = url;
//       imageContainer.appendChild(imgElement);
//     }).catch((error) => {
//       console.error('이미지 다운로드 실패:', error);
//     });
//   });
// }).catch((error) => {
//   console.error('폴더 목록 가져오기 실패:', error);
// });

//var storageRef = ref(storage, 'Image/AddCup.png');
const ImageData = [
  { imageSrc : "Image/Cup1.png", imageId : "CupImg1", tag : "img"},
  { imageSrc : "Image/Cup2.png", imageId : "CupImg2", tag : "img"},
  { imageSrc : "Image/MyInfo.png", imageId : "MyInfoImg", tag : "img"},
  { imageSrc : "Image/AddCup.png", imageId : "AddCupImg", tag : "img"},
  { imageSrc : "Image/News.png", imageId : "NewsImg", tag : "img"},
  { imageSrc : "Image/Header_Backgroung_Image.png", imageId : "header_main", tag : "div"},
]

ImageData.forEach(({imageSrc, imageId, tag}) => {
  getDownloadURL(ref(storage, imageSrc)).then((url) => {
    if(tag == "img") document.getElementById(imageId).src = url
    else if(tag == "div")
    document.getElementById(imageId).style = `background-image: url(${url})`
  }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
})
// getDownloadURL(ref(storage, 'Image/AddCup.png')).then((url) => {
//   document.getElementById('AddCupImg').src = url
// }).catch((error) => { console.error('이미지 다운로드 실패:', error);});