//Express 모듈 import 및 생성
const express = require('express');
const app = express();


//API 엔드포인트 생성
app.get('/api/weather', (req, res) => {
  // 코드 작성
});


//API 로직 구현
app.get('/api/weather', (req, res) => {
  // 로직 구현
  res.send('Hello, World!');
});


//API 서버 실행
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

