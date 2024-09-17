// db.js
const sqlite3 = require("sqlite3").verbose()
const database = new sqlite3.Database("../DB/mychatbot.db", (err) => {
  if (err) {
    console.error('DB 연결 에러: ', err.message);
  }
  console.log("Connected to the database.");
})

database.all(
  `CREATE TABLE if not exists bot(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    age INTEGER NULL,
    sex VARCHAR(10) NULL,
    mbti VARCHAR(10) NULL,
    custom_character TEXT NULL,
    image BLOB
  )`,
  [],
  (err, rows) => {
    if (err) {
      console.log('bot 테이블 생성 에러: ', err);
    }
  }
);

database.all(
  `CREATE TABLE if not exists user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    custom_character TEXT NULL,
    image BLOB
  )`,
  [],
  (err, rows) => {
    if (err) {
      console.log('user 테이블 생성 에러: ', err);
    } else {
      // 첫 생성 시 default user 추가
      database.all("INSERT INTO user (name) SELECT '사용자' WHERE NOT EXISTS (SELECT * FROM user)", [], (err, rows) => {
        if (err) {
          console.log('insert default user error: ', err);
        }
      })
    }
  }
);

const db = {
  execute: (query, callback, params) => {
    console.log({query});
    database.run(query, params ? params : [], function(err, rows, c) {
      callback(err, rows, this.lastID);
    });
  },
  select: (query, callback) => {
    console.log({query});
    database.all(query, function(err, rows) {
      callback(err, rows, this.lastID);
    });
  }
}

module.exports = db