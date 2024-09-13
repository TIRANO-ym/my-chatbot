const express = require("express");
const router = express.Router();
const { default: ollama } = require('ollama');

router.get("/", (req, res) => {
  console.log('### chat에서 요청 수신!');
  res.json("Welcome to chat router!!!");
});

router.post("/send_message", async (req, res) => {
  const msg = req.body.data;
  console.log('보낼 메시지: ', msg);

  const response = await ollama.chat({
    model: 'llama2',
    message: [{ role: 'user', content: msg }]
  });

  // FIXME: response.message.content is always empty
  console.log('받은 메시지: ', response);
  res.json(response.message.content);
});

module.exports = router;