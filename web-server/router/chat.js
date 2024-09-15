const express = require("express");
const router = express.Router();
const db = require("../db/db");

// const { default: ollama } = require('ollama');
// const axios = require('axios');

const OpenAI = require('openai');
const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

router.get("/check_model_is_ready", (req, res) => {
  // custom learning you want
  console.log('테스트 요청 수신...');
  res.json(true);
});

router.post("/send_message", async (req, res) => {
  const { prevConversation, inputMessage } = req.body.data;
  console.log('지금 보낼 메시지: ', inputMessage);
  console.log('과거 대화들: ', prevConversation);

  // FIXME: if use ollama library, response.message.content is always empty
  // const response = await ollama.chat({
  //   model: 'llama2',
  //   message: [{ role: 'user', content: msg }]
  // });
  const msgArr = [...prevConversation, { role: 'user', content: inputMessage }];

  const completion = await openai.chat.completions.create({
    model: 'kofriend',
    messages: msgArr
  });
  try {
    let reply = completion.choices[0].message.content;
    console.log('받은 메시지: ', reply);
    reply = trimReply(reply);
    reply = replaceItallicExpressions(reply);
    // TODO: 말투 교정
    // reply = something(reply);
    res.json({ reply: reply });
  } catch (e) {
    res.json({ error: e });
  }
});

function trimReply(str) {
  // 시작지점 줄바꿈 포함되는 문제
  if (str.startsWith('\r\n')) {
    str = str.replace('\r\n', '');
  }
  // 이상한 주석 쳐내기
  let idx = str.indexOf('\r\n Human:\r\n');
  if (idx !== -1) {
    str = str.slice(0, idx);
  }
  idx = str.indexOf('\r\n Assistant:\r\n');
  if (idx !== -1) {
    str = str.slice(0, idx);
  }
  return str;
}

function replaceItallicExpressions(str) {
  return str.replace(/(\*[a-zA-Z ]+\*){1,20}/gi, '');
}

module.exports = router;