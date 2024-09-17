import { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../service/apiService";
import { BatteryLoader, BotTalkingLoader } from "../component/icon-component";
import historyService from "../service/historyService";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: hidden;
`;

const HistoryBox = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.06);
  position: relative;
`;
const History = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  align-content: flex-end;
`;
const BotSaid = styled.div`
  width: fit-content;
  max-width: 55%;
  min-height: 50px;
  margin-right: auto;
  border-radius: 20px;
  border: 0;
  background-color: white;
  color: black;
  display: flex;
  padding: 20px;
  margin-top: 10px;
  align-items: center;
  word-break: keep-all;
`;
const ISaid = styled.div`
  width: fit-content;
  max-width: 55%;
  min-height: 50px;
  margin-left: auto;
  border-radius: 20px;
  border: 0;
  background-color: rgb(213 192 237);
  color: black;
  display: flex;
  padding: 20px;
  margin-top: 10px;
  align-items: center;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  gap: 20px;
`;
const InputArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.08);
  resize: none;
  color: white;
  padding: 20px;
  font-size: 1.1rem;
  font-family: var(--font-nanumfont);
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.07);
  }
  &::placeholder {
    color: gray;
  }
`;

const ErrorMessage = styled.div`
  color: tomato;
  width: 100%;
  max-height: 50px;
  overflow-y: hidden;
  text-align: center;
`;

export default function Chat(props) {
  const [currentBotId, setCurrentBotId] = useState(props.bot_id);
  const [isBotLoading, setIsBotLoading] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);

  const [inputMessage, setInputMessage] = useState('');
  const [histories, setHistories] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  // let pastMemory = [];

  const onInputChange = (e) => setInputMessage(e.target.value);

  const pressEnter = (e)=>{
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isBotTalking) {
        onTalkClick();
      }
    }
  }

  const onTalkClick = async () => {
    setErrMsg('');
    setInputMessage('');
    addHistory('user', inputMessage);
    setIsBotTalking(true);
    const response = await apiService.post('/chat/send_message', {
      inputMessage: inputMessage,
      prevConversation: histories,
      bot_id: currentBotId
    });
    console.log(response);
    setIsBotTalking(false);
    if (response.reply) {
      addHistory('system', response.reply);
      updateHistoryToServer();    // 현 대화(마지막 봇 대답 + 지금 내가 하는 말)는 포함되지 않고 이전 대화기록만 업데이트됨
    } else if (response.error) {
      setErrMsg(response.error);
    }
  };

  // role: 'system' or 'user'
  const addHistory = (role, message) => {
    const newObj = { role: role, content: message };
    setHistories((prev) => [...prev, newObj]);
  };

  const updateHistoryToServer = async () => {
    if (histories.length) {
      await historyService.update(currentBotId, histories);
    }
    return true;
  };

  const onChangeBot = async (new_bot_id) => {
    setIsBotLoading(true);
    await updateHistoryToServer();
    setCurrentBotId(new_bot_id);
    setHistories([]);
    const result = await historyService.get(new_bot_id);
    // console.log('봇 히스토리 로딩: ', result);
    if (typeof result === 'string') {
      setErrMsg(result);
    }
    setHistories(result);
    setIsBotLoading(false);
  }

  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log('bot 바뀜 ', props.bot_id);
    if (props.bot_id) {
      onChangeBot(props.bot_id);
    } else {
      setHistories([]);
      setInputMessage('');
      setErrMsg('');
    }
  }, [props.bot_id]);

  return (
    <Wrapper>
      <HistoryBox>
        <History>
          {
            histories.map((h, i) => {
              return h.role === 'system' ? <BotSaid className="chat-bubble" key={i}>{h.content}</BotSaid>
                              : <ISaid className="chat-bubble" key={i}>{h.content}</ISaid>
            })
          }
          { isBotTalking ? <BotSaid className="chat-bubble"><BotTalkingLoader/></BotSaid> : null }
        </History>
        { isBotLoading ? <BatteryLoader/> : null }
      </HistoryBox>
      {errMsg ? <ErrorMessage>{errMsg}</ErrorMessage> : null}
      <MessageBox>
        <InputArea type="text" value={inputMessage} onChange={onInputChange} onKeyDown={pressEnter}
          placeholder={props.bot_name ? `${props.bot_name}에게 메시지 보내기` : '나만의 친구 봇을 추가해서 대화를 시작해보세요!'}
          disabled={!props.bot_id}
        />
      </MessageBox>
    </Wrapper>
  );
}