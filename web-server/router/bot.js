const express = require("express");
const router = express.Router();
const db = require("../db/db");
const fs = require("fs");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/bot_list", (req, res) => {
  db.select('SELECT * FROM bot', async (err, rows) => {
    res.json(rows);
  });
});

router.post("/create_bot", async (req, res) => {
  const { name, age, sex, mbti, custom_character } = req.body.data;
  const query = `INSERT INTO bot (name, age, sex, mbti, custom_character) VALUES ("${name}", "${age}", "${sex}", "${mbti}", "${custom_character}")`;
  console.log({query});
  db.execute(query, async (err, rows, insertedId) => {
    if (err) {
      console.log(err);
    }
    console.log(`신규 봇 "${name}" DB에 추가 완료`, insertedId);
    await createModel({ name, age, sex, mbti, custom_character }, insertedId);
    res.json(insertedId);
  });
});

router.post("/update_bot", async (req, res) => {
  const { id, name, age, sex, mbti, custom_character } = req.body.data;
  const query = `UPDATE bot SET name="${name}", age="${age}", sex="${sex}", mbti="${mbti}", custom_character="${custom_character}" WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log('봇 업뎃 완료');
    await createModel({ name, age, sex, mbti, custom_character }, id);
    res.json(true);
  });
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
    res.json(true);
  })
});

async function createModel(data, id) {
  // todo: 모델 파일 내용 커스텀
  // todo: 모델 파일 작성
  // todo: ollama create 수행
  // todo: ollama list 체크 후 완료
  return true;
}

async function deleteModel(id) {
  // todo: ollama rm `friend-${id}`
  // todo: 모델 파일 삭제
  return true;
}

router.post("/bot_profile_image", upload.single('file'), (req, res) => {
  const file = req.file; // 업로드된 파일 정보
  // console.log('파일 정보:', file);
  const filePath = file.path; // 파일 경로
  let bot_id = file.originalname.split('_')[1]; // 파일 이름

  // 파일 데이터를 읽어 BLOB로 저장
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return res.status(500).json({ error: '파일 읽기 오류' });
    }

    // SQLite에 BLOB 저장
    const insertQuery = `UPDATE bot SET image=? WHERE id=${bot_id}`;
    db.execute(insertQuery, function (err, rows) {
      if (err) {
        console.log('저장 오류: ', err);
      }
      res.json(true);
    }, [fileData]);
  });
});
router.post("/get_bot_image", (req, res) => {
  const id = req.body.data;
  const query = `SELECT image FROM bot WHERE id=${id}`;
  db.select(query, (err, rows) => {
    res.setHeader('Content-Disposition', `attachment; filename="bot_${id}"`);
    res.setHeader('Content-Type', 'image/png');
    res.send(rows[0].image);
  });
})

module.exports = router;