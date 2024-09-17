# Making My Own Friend Bot (AI chat-bot)
## PC Specification Warning
* This project will drive the AI language model directly in localhost.
  * 8GB or more of memory is recommended.
* Therefore, free clouds typically has limited resource usage. So it is not suitable for upload and use on the cloud server.

## How to use this project

# 한국어
## PC 사양 경고
* 이 프로젝트는 AI 언어 모델을 로컬에서 직접 구동합니다.
  * 8GB 이상의 메모리를 권장합니다.
* 보통 무료 클라우드 서비스들은 자원 사용량이 제한적이죠. 그래서 클라우드 서버에 올려서 구동하기에는 적합하지 않습니다.

## 프로젝트 소개
* 나만의 친구 봇을 생성하고 대화할 수 있는 웹 서비스입니다. (~~서비스라기엔 혼자 로컬에서만 가지고 놀거지만~~)
* 내가 원하는 성격의 봇을 설정하면 웹서버에서 모델을 튜닝하고 생성해줍니다
  * 이름(필수), 나이대(선택), 성별(선택), MBTI(선택), 기타 설정(선택)
    * 기타 설정이란? → 기타 세부 설정들 직접 텍스트로 입력해서 모델 튜닝. (예: 넌 중세 시대에 살고 있는 공주님이야. 공주님처럼 대답해줘.)
* 사용자 정보를 입력해두면 챗봇에게 미리 내 정보를 가르쳐둘 수 있습니다.
  * 이름(필수), 기타 설정(선택)
    * 기타 설정이란? → 기타 세부 설정들 직접 텍스트로 입력. (예: 난 음악 들으면서 게임하는 걸 좋아해.)
  * ~~봇이 종종 내 이름을 모른척하는데, 내 이름 알면서 왜 모른척하냐고 뭐라고 하면 그제서야 이름 불러주기도 함~~
* 보통 무료로 오픈된 챗봇 API들은 단발성 대화인데, 최근 대화 내역 1000 건 까지 히스토리를 기억하기 때문에 대화를 통한 추가 학습도 가능합니다.
  * ~~1000번 이상 대화하면 까먹을 예정. 더 많이 기억하길 원하면 코드에서 수정 바람~~
* 미리보기
  * ㅁㅁ
