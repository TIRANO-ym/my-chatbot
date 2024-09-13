const express = require('express');
const app = express();
const PORT = 3001;

const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('port', process.env.PORT || 3001);
app.set('port', PORT);

const chatRouter = require("./router/chat");

app.get('/', (req, res) => {
  console.log('app.js에서 요청 수신!');
  res.json('Hello, Express');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
});

app.use("/chat", chatRouter);