import { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../service/apiService";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HistoryBox = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.06);
`;
const History = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  // display: flex;
  // flex-direction: column;
  // gap: 10px;
  padding: 20px;
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
  background-color: rgb(142, 172, 83);
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
  border: solid 1px gray;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0);
  resize: none;
  color: white;
  padding: 20px;
  font-size: 1.1rem;
  font-family: var(--font-nanumfont);
  &: focus {
    outline: none;
    border: solid 2px rgb(148, 148, 148);
  }
`;
const SendButton = styled.button`
  background-color: rgb(46, 96, 146);
  height: 100%;
  width: 100px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.div`
  color: tomato;
  width: 100%;
  max-height: 50px;
  overflow-y: auto;
  text-align: center;
`;

export default function Chat(props) {
  const [inputMessage, setInputMessage] = useState('');
  const [histories, setHistories] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  // let pastMemory = [];

  const onInputChange = (e) => setInputMessage(e.target.value);

  const pressEnter = (e)=>{
    console.log(e);
    if (e.key === "Enter"&& !e.shiftKey) {
      e.preventDefault();
      onTalkClick();
    }
  }

  const onTalkClick = async () => {
    setErrMsg('');
    setInputMessage('');
    addHistory('user', inputMessage);
    const response = await apiService.post('/chat/send_message', {
      inputMessage: inputMessage,
      prevConversation: histories
    });
    console.log(response);

    if (response.reply) {
      addHistory('system', response.reply);
    } else if (response.error) {
      setErrMsg(response.error);
    }
  };

  // role: 'system' or 'user'
  const addHistory = (role, message) => {
    const newObj = { role: role, content: message };
    setHistories((prev) => [...prev, newObj]);
    
    // if (pastMemory.length >= 1000) {
    //   pastMemory.shift();
    // }
    // pastMemory.push(newObj);
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log('bot 바뀜! ', props.bot_id);
  }, [props.bot_id]);

  return (
    <Wrapper>
      <HistoryBox>
        <History>
          {
            histories.map((h, i) => {
              return h.role === 'system' ? <BotSaid key={i}>{h.content}</BotSaid>
                              : <ISaid key={i}>{h.content}</ISaid>
            })
          }
        </History>
      </HistoryBox>
      {errMsg ?? <ErrorMessage>{errMsg}</ErrorMessage>}
      <MessageBox>
        <InputArea type="text" value={inputMessage} onChange={onInputChange} onKeyDown={pressEnter}/>
        {/* <SendButton onClick={onTalkClick}>Talk</SendButton> */}
      </MessageBox>
    </Wrapper>
  );
}