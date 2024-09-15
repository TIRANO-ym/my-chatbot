// db.js
const sqlite3 = require("sqlite3").verbose()
const database = new sqlite3.Database("../DB/mychatbot.db", (err) => {
  if (err) {
    console.error('DB 생성 에러: ', err.message);
  }
  console.log("Connected to the test database.");
})

database.all(
  `CREATE TABLE if not exists bot(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image BLOB NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER NULL,
    sex VARCHAR(10) NULL,
    mbti VARCHAR(10) NULL,
    custom_character TEXT NULL
  )`,
  [],
  (err, rows) => {
    if (err) {
      console.log('테이블 생성 에러: ', err);
    } else {
      // 첫 생성 시 default bot 추가
      database.all("INSERT INTO bot (name) SELECT '기본 친구' WHERE NOT EXISTS (SELECT * FROM bot)", [], (err, rows) => {
        if (err) {
          console.log('insert default data error: ', err);
        }
      })
    }
  }
);

const db = {
  execute: (query, callback, params) => {
    database.all(query, params ? params : [], callback);
  }
}

module.exports = db