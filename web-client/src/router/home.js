import { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../service/apiService";

const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const HistoryBox = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.281);
`;
const History = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  text-align: center;
`;
const BotSaid = styled.div`
  max-width: 55%;
  min-height: 50px;
  margin-right: auto;
  border-radius: 20px;
  border: 0;
  background-color: white;
  color: black;
  display: flex;
  padding: 0 20px;
  align-items: center;
`;
const ISaid = styled.div`
  max-width: 55%;
  min-height: 50px;
  margin-left: auto;
  border-radius: 20px;
  border: 0;
  background-color: rgb(142, 172, 83);
  color: black;
  display: flex;
  padding: 0 20px;
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

export default function Home() {
  const [inputMessage, setInputMessage] = useState('');
  const [histories, setHistories] = useState([]);

  const onInputChange = (e) => setInputMessage(e.target.value);
  const onTalkClick = async () => {
    addHistory('me', inputMessage);
    const response = await apiService.post('/chat/send_message', inputMessage);
    console.log(response);
    addHistory('bot', response);
  };

  // role: 'bot' or 'me'
  const addHistory = (role, message) => {
    setHistories((prev) => [...prev, { role: role, message: message}]);
  };

  useEffect(() => {
  }, []);

  return (
    <Wrapper>
      <HistoryBox>
        <History>
        <ISaid>테스트</ISaid>
          {
            histories.map((h, i) => {
              return h.role === 'bot' ? <BotSaid key={i}>뭐임{h.message}</BotSaid>
                              : <ISaid key={i}>뭐임{h.message}</ISaid>
            })
          }
        </History>
      </HistoryBox>
      <MessageBox>
        <InputArea type="text" value={inputMessage} onChange={onInputChange}/>
        <SendButton onClick={onTalkClick}>Talk</SendButton>
      </MessageBox>
    </Wrapper>
  );
}