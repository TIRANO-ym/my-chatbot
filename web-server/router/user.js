const express = require("express");
const router = express.Router();
const db = require("../db/db");
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/getUserInfo', (req, res) => {
  const userId = req.body.data;
  db.select(`SELECT * FROM user WHERE id=${userId}`, async (err, rows) => {
    res.json(rows[0]);
  });
});

router.post("/update_user", async (req, res) => {
  const { id, name, custom_character } = req.body.data;
  const query = `UPDATE user SET name="${name}", custom_character="${custom_character}" WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log('사용자 업뎃 완료');
    res.json(true);
  });
});

router.post("/user_profile_image", upload.single('file'), (req, res) => {
  const file = req.file;
  const filePath = file.path;
  let user_id = file.originalname.split('_')[1]; // 파일 이름에 user id 넣어둠

  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return res.status(500).json({ error: '파일 읽기 오류' });
    }
    const base64String = Buffer.from(fileData).toString('base64');
    const insertQuery = `UPDATE user SET image=? WHERE id=${user_id}`;
    db.execute(insertQuery, function (err, rows) {
      if (err) {
        console.log('저장 오류: ', err);
      }
      res.json(true);
    }, [`data:${file.mimetype};base64,${base64String}`]);
  });
});

router.post("/delete_user_image", async (req, res) => {
  const { id } = req.body.data;
  const query = `UPDATE user SET image="" WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log('사용자 프로필 이미지 삭제 완료');
    }
    res.json(true);
  });
});

module.exports = router;