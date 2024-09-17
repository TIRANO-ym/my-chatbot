const express = require("express");
const router = express.Router();
const db = require("../db/db");
const fs = require("fs");
const { exec, execSync } = require('child_process');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/bot_list", (req, res) => {
  db.select('SELECT * FROM bot', async (err, rows) => {
    res.json(rows);
  });
});

router.post("/create_bot", async (req, res) => {
  const { name, age, sex, mbti, custom_character, userInfo } = req.body.data;
  const query = `INSERT INTO bot (name, age, sex, mbti, custom_character) VALUES ("${name}", "${age}", "${sex}", "${mbti}", "${custom_character}")`;
  console.log({query});
  db.execute(query, async (err, rows, insertedId) => {
    if (err) {
      console.log(err);
    }
    console.log(`신규 봇 "${name}" DB에 추가 완료`, insertedId);
    await createModel({ id: insertedId, name, age, sex, mbti, custom_character }, userInfo);
    createHistoryFile(insertedId);
    res.json(insertedId);
  });
});

router.post("/update_bot", async (req, res) => {
  const { id, name, age, sex, mbti, custom_character, userInfo } = req.body.data;
  const query = `UPDATE bot SET name="${name}", age="${age}", sex="${sex}", mbti="${mbti}", custom_character="${custom_character}" WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log('봇 업뎃 완료');
    await createModel({ id, name, age, sex, mbti, custom_character }, userInfo);
    res.json(true);
  });
});

router.post("/delete_bot_image", async (req, res) => {
  const { id } = req.body.data;
  const query = `UPDATE bot SET image="" WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log('봇 이미지 삭제 완료');
    }
    res.json(true);
  });
});

router.post("/delete_bot", (req, res) => {
  const {id} = req.body.data;
  const query = `DELETE FROM bot WHERE id=${id}`;
  db.execute(query, async (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${id}번 봇 삭제 완료`);
      deleteModel(id);
      deleteHistoryFile(id);
    }
    res.json(true);
  })
});

async function createModel(botInfo, userInfo) {
  // 1. 모델 파일 내용 커스텀
  const fileName = `CustomModel_${botInfo.id}`;

  let temperature = 0;
  let isYoung = false;
  if (botInfo.age && botInfo.age < 20) {
    temperature += 1;
    isYoung = true;
  }
  let ageInfo = botInfo.age ? `${botInfo.age}-year-old` : '';
  let sexInfo = botInfo.sex ? (
    botInfo.sex === 'f' ? (isYoung ? 'girl' : 'woman')
    : (isYoung ? 'boy' : 'man')
  ) : '';
  if (ageInfo && sexInfo) {
    sexInfo = ` ${sexInfo}`;
  }

  let personality = '';
  if (botInfo.mbti) {
    if (botInfo.mbti[0] === 'e') {
      personality += `You have a lively personality.\n`;
    } else {
      personality += `You have a timid personality.\n`;
    }
    if (botInfo.mbti[1] === 'n') {
      personality += `You have a lot of imagination.\n`;
      temperature += 1;
    } else {
      personality += `You are thorough and precise.\n`;
      temperature -= 1;
    }
    if (botInfo.mbti[2] === 'f') {
      personality += `You have a lot of sensitivity. Empathize and encourage to user.\n`;
      temperature += 1;
    } else {
      personality += `You are logical and analytical.\n`;
      temperature -= 1;
    }
    if (botInfo.mbti[3] === 'p') {
      personality += `You are flexible.\n\n`;
      temperature += 1;
    } else {
      personality += `You are well-planned and well-directed.\n\n`;
      temperature -= 1;
    }
  }

  if (temperature < 0) temperature = 0;

  let nameCustom = '';
  const checkCondition = /Your name is .+\.\s*/gi;
  if (botInfo.custom_character && checkCondition.test(botInfo.custom_character)) {
    nameCustom = botInfo.custom_character.match(/Your name is .+\./)[0];
    botInfo.custom_character = botInfo.custom_character.replace(checkCondition, '');
  } else {
    nameCustom = `Your name is ${botInfo.name}.`;
  }

  const content = `FROM ggml-model-Q5_K_M.gguf

TEMPLATE """{{- if .System }}
<s>{{ .System }}</s>
{{- end }}
<s>Human:
{{ .Prompt }}</s>
<s>Assistant:
"""

SYSTEM """
${nameCustom}
${(ageInfo || sexInfo) ? `You are a ${ageInfo}${sexInfo}.` : ''}
You are my friend. Answer like a friend.${personality ? `\n${personality}` : ''}
${botInfo.custom_character ? botInfo.custom_character + '\n' : ''}
Don't use honorifics. Speak informally.
Answer in Korean.
Answer within 30 characters.

User name is ${userInfo.name}.${userInfo.custom_character ? `\n${userInfo.custom_character}` : ''}
"""

PARAMETER temperature ${temperature}
PARAMETER stop <s>
PARAMETER stop </s>`;

  // 2. 모델 파일 작성
  const step2 = await fs.writeFileSync(`../LLM/custom-model-files/${fileName}`, content);

  // 3. 올라마 모델 생성
  const step3 = await execSync(`ollama create friend${botInfo.id} -f ../LLM/custom-model-files/${fileName}`);

  // 4. 생성 확인
  // await new Promise((resolve) => {
  //   while(true) {
  //     setTimeout(async () => {
  //       const step4 = await execSync(`ollama list`);
  //       console.log('### step4: ', step4);
  //       if (step4) {
  //         resolve(true);
  //       }
  //     }, 1000);
  //   }
  // })
  
  return true;
}

function deleteModel(id) {
  exec(`ollama rm friend${id}`, (err, stdout) => {
    if(err) {
      console.log('ollama 모델 삭제 에러: ', err);
    }
  });
  fs.unlink(`../LLM/custom-model-files/CustomModel_${id}`, (err) => {
    if (err) {
      console.log('CustomModel 파일 삭제 에러: ', err);
    }
  });
}

router.post("/bot_profile_image", upload.single('file'), (req, res) => {
  const file = req.file;
  const filePath = file.path;
  let bot_id = file.originalname.split('_')[1]; // 파일 이름에 봇 id 넣어둠

  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return res.status(500).json({ error: '파일 읽기 오류' });
    }
    const base64String = Buffer.from(fileData).toString('base64');
    const insertQuery = `UPDATE bot SET image=? WHERE id=${bot_id}`;
    db.execute(insertQuery, function (err, rows) {
      if (err) {
        console.log('저장 오류: ', err);
      }
      res.json(true);
    }, [`data:${file.mimetype};base64,${base64String}`]);
  });
});
// router.post("/get_bot_image", (req, res) => {
//   const id = req.body.data;
//   const query = `SELECT image FROM bot WHERE id=${id}`;
//   db.select(query, (err, rows) => {
//     res.setHeader('Content-Disposition', `attachment; filename="bot_${id}"`);
//     res.setHeader('Content-Type', 'image/png');
//     res.send(rows[0].image);
//   });
// })

function createHistoryFile(id) {
  fs.writeFile(`../DB/chat_history/bot_${id}`, JSON.stringify([]), (err) => {
    if (err) {
      console.log('첫 히스토리 생성 오류: ', err);
    }
  });
}

router.post('/get_bot_chat_history', (req, res) => {
  const id = req.body.data;
  const filePath = `../DB/chat_history/bot_${id}`;
  try {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
        res.json('대화 내역 불러오기 실패: ', err.message);
      } else {
        res.json(JSON.parse(fileContent));
      }
    });
  } catch (e) {
    res.json('대화 내역 불러오기 실패: ', e.message);
  }
});

router.post('/update_bot_chat_history', (req, res) => {
  const {bot_id, histories} = req.body.data;
  const filePath = `../DB/chat_history/bot_${bot_id}`;
  fs.writeFile(filePath, histories, (err) => {
    if (err) {
      console.log('대화 히스토리 업데이트 오류: ', err);
    }
    res.json(true);
  });
});

function deleteHistoryFile(bot_id) {
  const filePath = `../DB/chat_history/bot_${bot_id}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`${bot_id}번 봇 대화 히스토리 삭제 오류: `, err);
    }
  })
}

module.exports = router;