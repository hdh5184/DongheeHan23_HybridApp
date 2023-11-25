import { app } from "./firebase.js"
import { isLogged } from "./login.js";
import { getStorage, ref, getDownloadURL, listAll } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 

//데이터베이스 불러오기
const db = getFirestore(app);
const storage = getStorage(app)

//데이터베이스를 통해 이미지 적용
const querySnapshot = await getDocs(collection(db, "ImageContent"));
querySnapshot.forEach((doc) => {
    var imageId = doc.data().id
    var imageSrc = doc.data().src
    var imageTag = doc.data().tag

    getDownloadURL(ref(storage, imageSrc)).then((url) => {
        if(imageTag == "img") document.getElementById(imageId).src = url
        else if(imageTag == "div")
        document.getElementById(imageId).style = `background-image: url(${url})`
      }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
});

if(!isLogged){
    getDownloadURL(ref(storage, "Image/LogIn.png")).then((url) => {
        document.getElementById("MyInfoImg").src = url
      }).catch((error) => { console.error('이미지 다운로드 실패:', error);});
}