const express = require("express");
const router = express.Router();
const customTone = require("../db/custom-tone.json");
const { exec, execSync } = require('child_process');

// const { default: ollama } = require('ollama');
// const axios = require('axios');

const OpenAI = require('openai');
const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

router.get("/check_model_is_ready", (req, res) => {
  // custom learning you want
  // console.log('테스트 요청 수신...');
  res.json(true);
});

router.post("/send_message", async (req, res) => {
  const { prevConversation, inputMessage, bot_id } = req.body.data;
  console.log('보낼 메시지: ', inputMessage);
  // console.log('과거 대화들: ', prevConversation);

  // FIXME: if use ollama library, response.message.content is always empty
  // const response = await ollama.chat({
  //   model: 'llama2',
  //   message: [{ role: 'user', content: msg }]
  // });
  const msgArr = [...prevConversation, { role: 'user', content: inputMessage }];

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model: `friend${bot_id}`,
      messages: msgArr
    });
  } catch (e) {
    console.log(e);
    // Connection error 발생 시
    if (e.message.startsWith('Connection error')) {
      res.json({
        error: 'Please execute ollama! (write "ollama serve" on cmd or execute Ollama app using window searchbar)'
     });
    } else {
      res.json({
        error: e.message
     });
    }
    return;
  }

  try {
    let reply = completion.choices[0].message.content;
    console.log('받은 메시지: ', reply);
    reply = trimReply(reply);                   // 응답 내용과 무관한 주석 제거
    reply = replaceItallicExpressions(reply);   // Itallic 표현 제거
    reply = improveBotChatTone(reply);          // 말투 교정
    res.json({ reply: reply });
  } catch (e) {
    res.json({ error: e });
  }
});

function trimReply(str) {
  // 시작지점 줄바꿈 포함되는 문제
  str = str.replace(/^\s/, '');

  // 이상한 주석 쳐내기
  let idx = str.indexOf('\r\n Human:');
  if (idx !== -1) {
    str = str.slice(0, idx);
  }
  idx = str.indexOf('Human:');
  if (idx !== -1) {
    str = str.slice(0, idx);
  }
  idx = str.indexOf('\r\n Assistant:');
  if (idx !== -1) {
    str = str.slice(0, idx);
  }
  idx = str.indexOf('Assistant:');
  if (idx !== -1) {
    str = str.slice(0, idx);
  }

  // 끝에 남은 여백 없애기
  str = str.replace(/\s$/, '');
  return str;
}

function replaceItallicExpressions(str) {
  return str.replace(/(\*[a-zA-Z ㄱ-ㅎㅏ-ㅣ가-힣]+\*){1,20}/gi, '');
}

function improveBotChatTone(str) {
  for (let key of Object.keys(customTone)) {
    str = str.replace(new RegExp(key, 'gi'), customTone[key]);
  }
  return str;
}

module.exports = router;