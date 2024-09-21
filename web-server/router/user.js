const express = require("express");
const router = express.Router();
const db = require("../db/db");
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/getUserInfo', (req, res) => {
  const userId = req.body.data;
  db.select(`SELECT * FROM user WHERE id=${userId}`, (err, rows) => {
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
      // todo: web-server/uploads 정리 필요
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body.data;
  const query = `SELECT id, name, email, password FROM user WHERE email="${email}"`;
  db.select(query, async (err, rows) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    } else {
      if (rows && rows.length && (rows[0].password === password)) {
        // 로그인 성공
        res.json({
          id: rows[0].id,
          name: rows[0].name,
          email: rows[0].email
        });
      } else {
        res.json({ error: 'Email or Password is not matched' });
      }
    }
  });
});

router.post("/createUser", async (req, res) => {
  const { email, password, name } = req.body.data;
  const selectQuery = `SELECT * FROM user WHERE email="${email}"`;
  const isExist = await new Promise((resolve) => {
    db.select(selectQuery, (err, rows) => {
      resolve(rows && rows.length);
    });
  });
  // 이메일 중복
  if (isExist) {
    res.json({error: 'existEmail'});
    return;
  }

  const insertQuery = `INSERT INTO user (email, password, name) VALUES ("${email}", "${password}", "${name}")`;
  db.execute(insertQuery, async (err, rows) => {
    if (err) {
      console.log(err);
      res.json({error: err});
    } else {
      res.json({});
    }
  });
});

module.exports = router;