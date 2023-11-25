import { isLogged } from "./login.js";

$("#share").click(async (enent) => {
    if(isLogged){
        try {
            // navigator.share를 지원하는지 확인
            if (navigator.share) {
              // 공유할 데이터 정의
              const shareData = {
                title: '공유를 하는 나',
                text: '대충 내용들 1234567890',
                url: 'https://example.com'
              };
        
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
        alert('로그인 시 이용 가능합니다.')
    }
})