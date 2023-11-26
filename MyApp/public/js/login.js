import { app } from "./firebase.js"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 

import { db, storage } from "./database.js"

const auth = getAuth();

export { auth }

const MyInfo = document.getElementById('MyInfo');

const exitLogin = document.getElementById('exit_login_main')
const goSignUp = document.getElementById('goSignUp')
const goSignIn = document.getElementById('goSignIn')

MyInfo.addEventListener('click', userInfo)
goSignUp.addEventListener('click', SignUp)
goSignIn.addEventListener('click', SignIn)
exitLogin.addEventListener('click', loginExit)

let isLogged //로그인 유무
export {isLogged}

//회원가입
document.getElementById('signUpButton').addEventListener('click', async (event) => {
    event.preventDefault();
    const signUpEmail = document.getElementById('signUpEmail').value; //이메일
    const signUpPassword = document.getElementById('signUpPassword').value; //비밀번호
    const signUpPasswordConfirm = document.getElementById('signUpPasswordConfirm').value; //비밀번호 재확인

    if(signUpPassword != signUpPasswordConfirm){
        //비밀번호 재확인 불일치
        alert("비밀번호를 다시 확인하세요.")
    }
    else{
        try {
            //회원가입 진행
            const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
            const user = userCredential.user;

            const signUpDate =
            new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString()

            var addUser = doc(db, "User", signUpEmail);
            await setDoc(addUser, { });
            var addUserContent = doc(db, "User", signUpEmail, "UserCupCountMonth", signUpDate);
            await setDoc(addUserContent, {
                plasticCount : 0,
                reusableCount : 0
            });

            alert("회원가입을 완료하였습니다.");
            location.reload();
        } catch (error) {
            //회원가입 실패
            const errorCode = error.code;
            const errorMessage = error.message;
            switch(errorCode){
                case "auth/invalid-email":
                    alert("이메일의 형식이 올바르지 않습니다."); break;
                case "auth/missing-password":
                    alert("비밀번호를 입력하세요."); break;
                case "auth/weak-password":
                    alert("비밀번호를 최소 6자리 이상으로 설정하세요."); break;
                case "auth/email-already-in-use":
                    alert("해당 이메일의 계정이 이미 있습니다. 다른 이메일을 사용하세요."); break;
                default:
                    alert("올바르지 않은 형식입니다."); break;

            }
            console.error("가입 중 오류 발생:", errorCode, errorMessage);
        }
    }
});

//로그인
document.getElementById('signInButton').addEventListener('click', async (event) => {
    event.preventDefault();

    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;

    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
        //로그인 완료
        console.log(userCredential)
        const user = userCredential.user;
        location.reload();
    })
    .catch((error) => {
        //로그인 실패
        const errorCode = error.code;
        const errorMessage = error.message;
        switch(errorCode){
            case "auth/invalid-email":
                alert("이메일의 형식이 올바르지 않습니다."); break;
            case "auth/missing-password":
                alert("비밀번호를 입력하세요."); break;
            case "auth/invalid-login-credentials":
                alert("이메일 또는 비밀번호를 다시 확인하세요."); break;
            default:
                alert("올바르지 않은 형식입니다."); break;
        }
        console.error("로그인 중 오류 발생:", errorCode, errorMessage);
    });
});

//로그아웃
document.getElementById('signOutButton').addEventListener('click', async (event) => {
    event.preventDefault()
    auth.signOut()
    location.reload();
})

//로그인 상태 확인
onAuthStateChanged(auth, (user) => {
    if (user) {
        //const uid = user.uid;
        console.log("로그인 중")
        isLogged = true;
        document.getElementById('MyInfoDiv').innerHTML = `
        <img src="public/img/MyInfo.png" id="MyInfoImg" alt="내 정보" width="48px" height="48px">
        <br>내 정보
        `
    } else {
        console.log("나감")
        isLogged = false
        document.getElementById('MyInfoDiv').innerHTML = `
        <img src="public/img/Login.png" id="MyInfoImg" alt="로그인" width="48px" height="48px">
        <br>로그인
        `
    }
});

//로그인 또는 내 정보
function userInfo(){
    document.getElementById('login_main').style = "display : content"
    if(isLogged){
        document.getElementById('MyInfo_main').style = "display : flex"
    }
    else{
        document.getElementById('login_Form').style = "display : flex"
    }
    
}

//회원가입 창 출현
function SignUp(){
    document.getElementById('SignUp_Form').style = "display : flex"
    document.getElementById('login_Form').style = "display : none"
}
//로그인 창 출현
function SignIn(){
    document.getElementById('login_Form').style = "display : flex"
    document.getElementById('SignUp_Form').style = "display : none"
}
//로그인 및 회원가입 창에서 나가기
function loginExit(){
    document.getElementById('login_main').style = "display : none"
    SignIn() //기본 로그인 창이 먼저 출현
}

