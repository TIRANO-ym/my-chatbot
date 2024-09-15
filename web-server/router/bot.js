const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/bot_list", (req, res) => {
  db.execute('SELECT * FROM bot', (err, rows) => {
    res.json(rows);
  });
});

router.post("/create_bot", (req, res) => {
  const { image, name, age, sex, mbti, custom_character } = req.body.data;
  const query = `INSERT INTO bot (image, name, age, sex, mbti, custom_character) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    image,
    name,
    age,
    sex,
    mbti,
    custom_character
  ];
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log('신규 봇 DB에 추가 완료');
    await createModel({ name, age, sex, mbti, custom_character });
  }, params);
});

router.post("/update_bot", (req, res) => {
  const { id, image, name, age, sex, mbti, custom_character } = req.body.data;
  const query = `UPDATE bot SET image=?, name=?, age=?, sex=?, mbti=?, custom_character=? WHERE id=${id}`;
  const params = [
    image,
    name,
    age,
    sex,
    mbti,
    custom_character
  ];
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log('신규 봇 DB에 추가 완료');
    await createModel({ name, age, sex, mbti, custom_character });
  }, params);
});

router.post("/delete_bot", (req, res) => {
  const {id} = req.body.data;
  const query = `DELETE FROM bot WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(`${id}번 봇 삭제 완료`);
    await deleteModel(id);
  })
})

async function createModel(data) {
  // todo: 모델 파일 내용 커스텀
  // todo: 모델 파일 작성
  // todo: ollama create 수행
  // todo: ollama list 체크 후 완료
  return;
}

async function deleteModel(id) {
  // todo: ollama rm `friend-${id}`
  // todo: 모델 파일 삭제
  return;
}

module.exports = router;