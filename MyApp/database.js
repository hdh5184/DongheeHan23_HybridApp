import { app } from "./firebase.js"
import { getStorage, ref, getDownloadURL, listAll } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

//데이터베이스 불러오기
const db = getFirestore(app);
const storage = getStorage(app)

export {db, storage}