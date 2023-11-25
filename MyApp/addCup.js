import { db } from "./database.js"
import { auth } from "./login.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 

let selectCup = null

$("#AddCup").click((event) => {
    $('#addCup_main').show()
})

$("#exit_addCup_main").click((event) => {
    $('#addCup_main').hide()
})

$("input[name='selectCupGroup']").change(function(){
    if($("input[name='selectCupGroup']:checked").val() == 1) $('#discount_input').show()
    else $('#discount_input').hide()
});

$("#selectCup_plastic").click((event)=>{
    document.getElementById("selectCup_reusable").style = "opacity : 0.5"
    document.getElementById("selectCup_plastic").style = "opacity : 1"
    selectCup = "plastic"
})

$("#selectCup_reusable").click((event)=>{
    document.getElementById("selectCup_plastic").style = "opacity : 0.5"
    document.getElementById("selectCup_reusable").style = "opacity : 1"
    selectCup = "reusable"
})

$("#addCup_button").click((event)=>{
    if(selectCup == null){
        alert("사용한 컵을 선택해주세요.")
    }
    else{
        var benefitSeleted = ($("input[name='selectCupGroup']:checked").val() == 1) ? "discount" : "benefit"
        var discountValue = parseInt(document.getElementById("discount_value").value)
    
        onAuthStateChanged(auth, (user) => {
            if (user) {
                var Email = user.email.toString()
                var addUserContent = doc(db, "User", Email, "UseCupHistory", new Date().toString());
                setDoc(addUserContent, {
                    benefit : benefitSeleted,
                    discountValue : (benefitSeleted == "discount") ? discountValue : 0,
                    useCupType : selectCup
                });
                alert("기록 되었습니다.")
                
                selectCup = null
                $('#addCup_main').hide()
                document.getElementById("selectCup_plastic").style = "opacity : 0.5"
                document.getElementById("selectCup_reusable").style = "opacity : 0.5"
            } else {
                alert('로그인 시 이용 가능합니다.')
            }
        });
    }
})