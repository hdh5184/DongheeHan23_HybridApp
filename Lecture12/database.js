
//유저 데이터
var userData = [
    {
        id : "dfgdfdg",
        password : "sdgnds",
        personal_best : 46333,
        playCount : 325
    },
    {
        id : "adfbdb",
        password : "aefbherab",
        personal_best : 18742,
        playCount : 555
    },
    {
        id : "qwrgera",
        password : "bdsfgngsfn",
        personal_best : 12422,
        playCount : 235
    },
    {
        id : "asda",
        password : "dfbfb",
        personal_best : 124215,
        playCount : 523
    },
    {
        id : "wrgqr",
        password : "tukuk",
        personal_best : 98543,
        playCount : 1331
    },
    {
        id : "asvdabv",
        password : "qrwgvbf",
        personal_best : 91237,
        playCount : 2464
    }
]

var highScore = 0
var highScoreId
for (let i = 0; i < userData.length; i++) {

    if(highScore < userData[i].personal_best){
        highScore = userData[i].personal_best
        highScoreId = userData[i].id
    }
}

//JSON에 저장할 데이터
var memberData = {
    number_of_people : userData.length,
    highScore : highScore,
    highScore_id : highScoreId,
    personal_data : userData
}

//JSON으로 생성하는 나
var jsonData = JSON.stringify(memberData);

//JSON의 내용을 읽어오는 나
var memberData2 = JSON.parse(jsonData);
console.log("최고기록 : " + memberData2.highScore);
console.log("최고인 나 : " + memberData2.highScore_id);