import { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../service/apiService";
import { BatteryLoader, BotProfile, BotTalkingLoader } from "../component/icon-component";
import historyService from "../service/historyService";
import { useTranslation } from "react-i18next";

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
  background-color: ${({theme}) => theme.chatBoxBgColor};
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
  background-color: ${({theme}) => theme.botChatBgColor};
  color: ${({theme}) => theme.botChatTextColor};
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
  background-color: ${({theme}) => theme.userChatBgColor};
  color: ${({theme}) => theme.userChatTextColor};
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
  background-color: ${({theme}) => theme.chatInputAreaBgColor};
  resize: none;
  color: ${({theme}) => theme.chatInputAreaTextColor};
  padding: 20px;
  font-size: 1.1rem;
  font-family: var(--font-nanumfont);
  &:focus {
    outline: none;
    background-color: ${({theme}) => theme.chatInputAreaFocusBgColor};
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
  const { t } = useTranslation();
  const [currentBotId, setCurrentBotId] = useState(props.bot_id);
  const [isBotLoading, setIsBotLoading] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);

  const [inputMessage, setInputMessage] = useState('');
  const [histories, setHistories] = useState([]);
  const [errMsg, setErrMsg] = useState('');

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
    setIsBotTalking(false);
    if (response.reply) {
      addHistory('system', response.reply);
      // 현 대화도 같이 저장하도록
      updateHistoryToServer([
        { role: 'user', content: inputMessage },
        { role: 'system', content: response.reply }
      ]);
    } else if (response.error) {
      setErrMsg(response.error);
    }
  };

  // role: 'system' or 'user'
  const addHistory = (role, message) => {
    const newObj = { role: role, content: message };
    setHistories((prev) => [...prev, newObj]);
  };

  const updateHistoryToServer = async (lastConv) => {
    const arr = histories;
    if (lastConv) {
      arr.push(...lastConv);
    }
    if (arr.length) {
      await historyService.update(currentBotId, arr);
    }
    return true;
  };

  const onChangeBot = async (new_bot_id) => {
    setIsBotLoading(true);
    await updateHistoryToServer();
    setCurrentBotId(new_bot_id);
    setHistories([]);
    // 과거 대화 내역 가져오기
    const result = await historyService.get(new_bot_id);
    if (typeof result === 'string') {
      setErrMsg(result);
    }
    setHistories(result);
    setIsBotLoading(false);
  }

  useEffect(() => {
    // 봇 변경
    if (props.bot_id) {
      onChangeBot(props.bot_id);
    } else {
      setHistories([]);
      setInputMessage('');
      setErrMsg('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bot_id]);

  return (
    <Wrapper>
      <HistoryBox>
        <div className="selectedBotProfile">
          <BotProfile src={props.bot_image} idx={props.idx}/>
          <p className="name">{props.bot_name}</p>
        </div>
        <History className="historyUnderProfile">
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
          placeholder={props.bot_name ? t("chat.message_to").replace('{BOT_NAME}', props.bot_name) : t("chat.start_message")}
          disabled={!props.bot_id}
        />
      </MessageBox>
    </Wrapper>
  );
}