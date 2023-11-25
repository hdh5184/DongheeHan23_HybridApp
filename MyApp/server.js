const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

// SSL 인증서 및 개인 키 파일 경로
const privateKey = fs.readFileSync('private-key.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// 정적 파일을 제공할 디렉터리 설정
app.use(express.static('public'));

// 미들웨어 및 라우트 정의
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app.html');
});

// HTTPS 서버 생성
const httpsServer = https.createServer(credentials, app);

// 서버 시작
httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

