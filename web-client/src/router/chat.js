import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import apiService from "../service/apiService";
import { BatteryLoader, BotProfile, BotTalkingLoader, XIcon } from "../component/icon-component";
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

const ErrorBox = styled.div`
  width: 100%;
  max-height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  svg {
    width: 30px;
    cursor: pointer;
    margin-right: 20px;
  }
  svg:hover {
    opacity: 0.8;
  }
`;
const ErrorMessage = styled.div`
  color: tomato;
`;

export default function Chat(props) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
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
      // 메시지 전송 에러. 전송되지 않은 메시지 히스토리 제거 후 재세팅
      setErrMsg(response.error);
      setHistories((prev) => {
        const lastUserSaid = prev.pop();
        setInputMessage(lastUserSaid.content);
        return prev;
      });
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
  };

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

  useEffect(() => {
    // 챗박스 스크롤 맨 아래로
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [histories]);

  return (
    <Wrapper>
      <HistoryBox>
        <div className="selectedBotProfile">
          <BotProfile src={props.bot_image} idx={props.idx}/>
          <p className="name">{props.bot_name}</p>
        </div>
        <History className="historyUnderProfile" ref={scrollRef}>
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
      {errMsg ? <ErrorBox><XIcon onClick={() => setErrMsg('')}/><ErrorMessage>{errMsg}</ErrorMessage></ErrorBox> : null}
      <MessageBox>
        <InputArea type="text" value={inputMessage} onChange={onInputChange} onKeyDown={pressEnter}
          placeholder={props.bot_name ? t("chat.message_to").replace('{BOT_NAME}', props.bot_name) : t("chat.start_message")}
          disabled={!props.bot_id}
        />
      </MessageBox>
    </Wrapper>
  );
}