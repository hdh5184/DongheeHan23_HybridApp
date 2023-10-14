const express = require('express'); //express 불러오기
const cors = require('cors');
const app = express();
const port = 12311;

app.get('/hi', hi);
app.listen(port, startserver);

app.use(cors());

function hi(req, res){ //req : 받는 값
    res.header("Access-Control-Allow-Origin", "*");
    res.send('데이터를 불러온 나 dsjhfcdjhcdsofjdshfdsjhfdsoi');
}

function startserver(){
    console.log('서버를 시작한 나http://localhost:${port}/hi');
}