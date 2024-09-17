# 한국어: 나만의 친구 봇 만들기 (AI 챗봇)
## PC 사양 경고
* 이 프로젝트는 AI 언어 모델을 로컬에서 직접 구동합니다.
  * 8GB 이상의 메모리를 권장합니다.
* 보통 무료 클라우드 서비스들은 자원 사용량이 제한적이죠. 그래서 클라우드 서버에 올려서 구동하기에는 적합하지 않습니다.

## 프로젝트 소개
* 나만의 친구 봇을 생성하고 대화할 수 있는 웹 서비스입니다. (~~서비스라기엔 혼자 로컬에서만 가지고 놀거지만~~)
* 내가 원하는 성격의 봇을 설정하면 웹서버에서 모델을 튜닝하고 생성해줍니다.
  * 이름(필수), 나이대(선택), 성별(선택), MBTI(선택), 기타 설정(선택)
    * 기타 설정이란? → 기타 세부 설정들 직접 텍스트로 입력해서 모델 튜닝. (예: 넌 중세 시대에 살고 있는 공주님이야. 공주님처럼 대답해줘.)
* 사용자 정보를 입력해두면 챗봇에게 미리 내 정보를 가르쳐둘 수 있습니다.
  * 이름(필수), 기타 설정(선택)
    * 기타 설정이란? → 기타 세부 설정들 직접 텍스트로 입력. (예: 난 음악 들으면서 게임하는 걸 좋아해.)
  * ~~봇이 종종 내 이름을 모른척하는데, 내 이름 알면서 왜 모른척하냐고 뭐라고 하면 그제서야 이름 불러주기도 함~~
* 보통 무료로 오픈된 챗봇 API들은 단발성 대화인데, 최근 대화 내역 1000 건 까지 히스토리를 저장해서 들고 대화하기 때문에 대화를 통한 추가 학습도 가능합니다.
  * ~~1000번 이상 대화하면 까먹을 예정. 더 많이 기억하길 원하면 코드에서 수정 바람~~
* 미리보기
  * ![미리보기](https://github.com/TIRANO-ym/my-chatbot/blob/master/preview.png)

## 프로젝트 사용법
### 1단계: 준비하기
1. 프로젝트를 clone하면 4개의 폴더가 있습니다: web-client, web-server, DB, LLM
2. LLM 폴더로 들어갑니다.
3. "올라마 세팅과정 1.txt" 파일 열고 그대로 수행합니다.
4. "올라마 세팅과정 2 - 한국어 모델.txt" 파일 열고 그대로 수행합니다. 그러면 LLM 준비 완료.
> 여기서 한국어 모델 .gguf 파일을 다운받게 되는데, 더 좋은 한국어 모델 알고 있으면 그 모델의 gguf 사용해도 상관 없습니다.
> 대신 web-server/router/bot.js 에서 "FROM ggml-model-Q5_K_M.gguf" 부분 수정해줘야 합니다.
5. DB 폴더로 들어갑니다.
6. sqlite.exe 파일이 있는데 실행해서 sqlite를 설치해줍니다. (못 미더우면 직접 sqlite 사이트에서 받아서 설치해도 됩니다.)
### 2단계: 웹 클라이언트 실행
1. 일단 window powershell을 엽니다.
2. 프로젝트의 web-client 경로로 이동합니다.
3. npm install 한번 해줍니다.
4. npm start 수행하면 준비 완료
### 3단계: 웹 서버 실행
1. 프로젝트의 web-server 경로로 이동합니다.
2. npm install 한번 해줍니다.
3. npm start 수행하면 준비 완료
### 4단계: 사용해보기
* 이제 localhost:3000 으로 접속해서 나만의 챗봇을 추가하고 대화할 수 있습니다.

## 팁
* 한국어 모델이긴 한데 영어 번역에서 한 번 거쳐오는 듯이 대답하는 경우가 종종 있습니다. (~~너무 정직하게 말한다고 해야하나~~)
* 대화하면서 이 부분은 꼭 이렇게 바꿔서 말했으면 좋겠다 하는 부분은 수동 튜닝하려고 다음 위치에 json 파일 하나 만들어놨습니다. (아직 몇 개 없지만.. 대화하면서 계속 추가해나가야 할 듯)
  * web-server/db/custom-tone.json
* 파일을 열어보면 바로 알겠지만, json의 key 값에 해당하는 부분이 있으면 value로 바꿔줍니다.
  * key는 정규식에 사용되기 때문에, 정규식 문법으로 정의되어 있는 특수문자는 앞에 역슬래시 2개 붙여줘야 합니다.




---




# English: Making My Own Friend Bot (AI chat-bot)
## PC Specification Warning
* This project will drive the AI language model directly in localhost.
  * 8GB or more of memory is recommended.
* Therefore, free clouds typically has limited resource usage. So it is not suitable for upload and use on the cloud server.

## Introduction to the Project
* It's a web service what you can create your own friend bot and talk to it. (~~i'm only going to play with it locally, but~~)
* When I set up a bot with the personality I want, the web server tunes the model and creates it.
  * Name (Required), Age (Select), Gender (Select), MBTI (Select), Other Settings (Select)
    * What are the other settings? → Model tuning by entering other advanced settings directly in text. (Example: You are a princess who living in the Middle Ages. Answer like a princess.)
* If you enter your user information, you can tell your information to the chatbot in advance.
  * Name (Required), Other Settings (Select)
    * What are the other settings? → Enter other advanced settings directly in text. (Example: I like to play games while listening to music.)
  * ~~Sometimes bots pretend not to know my name, but when they know my name and say something about why they pretend not to know my name, they finally call me by my name~~
* Usually, the chatbot API, which is open for free, is a one-off conversation, but it stores and holds up to 1,000 recent conversation histories, so additional learning through conversation is also possible.
  * ~~If you talk more than 1,000 times, bot'll forget about past. If you want bot to remember more, You'll modify the code to correct it~~
* Preview
  * ![Preview](https://github.com/TIRANO-ym/my-chatbot/blob/master/preview.png)

## How to use a project
### Step 1: Prepare
1. If you clone a project, there are 4 folders: web-client, web-server, DB, LLM
2. Enter the LLM folder.
3. Open the "올라마 세팅과정 1.txt" file and do so.
4. Open the "올라마 세팅과정 2 - 한국어 모델.txt" file and do so. **(It is for Korean).** Now, LLM is ready.
5. Enter the DB folder.
6. There is a "sqlite.exe" file. Runs it for install sqlite. (Or you can get it and install it directly from the SQLite web site.)
### Step 2: Run web-client
1. First, open window powdershell.
2. Move to the web-client path of the project.
3. Run command: "npm install"
4. And run command: "npm start"
### Step 3: Run web-server
1. Move to the web-server path of the project.
2. Run command: "npm install"
3. And run command: "npm start"
### Step 4: Let's use!
* Now, you can access the localhost:3000 to add your own chat-bot friend.
