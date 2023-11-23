import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
const auth = getAuth();

const MyInfo = document.getElementById('MyInfo');

const goSignUp = document.getElementById('goSignUp')
const goSignIn = document.getElementById('goSignIn')

MyInfo.addEventListener('click', userInfo)
goSignUp.addEventListener('click', SignUp)
goSignIn.addEventListener('click', SignIn)

let isLogged

//회원가입
document.getElementById('signUpButton').addEventListener('click', async (event) => {
    event.preventDefault();
    const signUpEmail = document.getElementById('signUpEmail').value;
    const signUpPassword = document.getElementById('signUpPassword').value;
    const signUpPasswordConfirm = document.getElementById('signUpPasswordConfirm').value;
    //console.log(signUpEmail, signUpPassword);

    if(signUpPassword != signUpPasswordConfirm){
        alert("비밀번호를 다시 확인하세요.")
    }
    else{
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
    
            // 사용자가 로그인되었습니다.
            const user = userCredential.user;
            console.log("사용자 가입 완료:", user);
        } catch (error) {
            // 여기서 오류를 처리합니다.
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
        alert("yeeeeee")
        console.log(userCredential)

        // Signed in 
        const user = userCredential.user;
        // ...

        location.reload();
    })
    .catch((error) => {
        console.log("aeeeeeerror")
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

document.getElementById('signOutButton').addEventListener('click', async (event) => {
    event.preventDefault()
    auth.signOut()
    location.reload();
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("로그인 중")
        console.log(user);
        // ...
        isLogged = true;
        document.getElementById('MyInfoDiv').innerHTML = `
        <img id="MyInfoImg" src="img/MyInfo.png" alt="내 정보" width="48px" height="48px">
        <br>내 정보
        `
    } else {
        // User is signed out
        // ...
        console.log("나감")
        isLogged = false
        document.getElementById('MyInfoDiv').innerHTML = `
        <img id="MyInfoImg" src="img/LogIn.png" alt="내 정보" width="48px" height="48px">
        <br>로그인
        `
    }
});


function userInfo(){
    document.getElementById('login_main').style = "display : content"
    if(isLogged){
        document.getElementById('MyInfo_main').style = "display : flex"
    }
    else{
        document.getElementById('login_Form').style = "display : flex"
    }
    
}

function SignUp(){
    document.getElementById('SignUp_Form').style = "display : flex"
    document.getElementById('login_Form').style = "display : none"
}
function SignIn(){
    document.getElementById('login_Form').style = "display : flex"
    document.getElementById('SignUp_Form').style = "display : none"
}
