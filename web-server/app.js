const express = require('express');
const app = express();
const PORT = 3001;

// Cross-Origin Resource Sharing 허용
const cors = require('cors');
app.use(cors());

// request body json으로 파싱 설정
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// json 파싱 기본용량이 100kb임. 늘려줌
app.use(express.json({
  limit : "10mb"
}));
// app.use(express.urlencoded({
//   limit:"10mb",
//   extended: false
// }));

// app.set('port', process.env.PORT || 3001);
app.set('port', PORT);

const chatRouter = require("./router/chat");
const botRouter = require("./router/bot");

app.get('/', (req, res) => {
  console.log('app.js에서 요청 수신!');
  res.json('Hello, Express');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
});

app.use("/chat", chatRouter);
app.use("/bot", botRouter);