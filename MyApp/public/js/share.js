import { isLogged } from "./login.js";
import { MyKeyword } from "./init.js";

$("#share_button").click(async (enent) => {
    if(isLogged){
        try {
            // navigator.share를 지원하는지 확인
            if (navigator.share) {
              let shareData = {
                title: '타이틀',
                text: '내용'
              }
              switch(parseInt($("input[name='selectKeyword']:checked").val())){
                case 1:
                  shareData.title = "지금까지 사용한 개인 컵"
                  shareData.text = MyKeyword.reusable + "개"
                  break
                case 2:
                  shareData.title = "사용하지 않은 일회용 컵"
                  shareData.text = MyKeyword.reusable + "개"
                  break
                case 3:
                  shareData.title = "지금까지 개인 컵 사용하기"
                  shareData.text = MyKeyword.reusable + "번째"
                  break
                case 4:
                  shareData.title = "지금까지 받은 혜택"
                  shareData.text = MyKeyword.benefit + "회"
                  break
                case 5:
                  shareData.title = "지금까지 아낀 금액"
                  shareData.text = MyKeyword.discount + "원"
                  break
              }
        
              // navigator.share 호출
              await navigator.share(shareData);
        
              console.log('Successfully shared');
            } else {
              alert('이 브라우저에선 공유를 지원하지 않습니다.');
            }
        } catch (error) {
        console.error('Error sharing:', error);
        console.log('공유하는 데 오류가 생겼습니다.');
        }
    }
    else{
        alert('로그인 후 이용 가능합니다.')
    }
})

$("#exit_share").click((event) => {
  $("#sharePage").hide()
  $("#mainPage").show()
})

$("#share").click((event) => {
  $("#mainPage").hide()
  $("#sharePage").show()
})