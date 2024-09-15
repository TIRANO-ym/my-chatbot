// import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Chat from "../router/chat";
import { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { BotProfile, EditIcon, PlusIcon } from "./icon-component";
import CreateBotModal from "./create-bot-modal";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: 20% 3fr;
  padding: 50px;
  width: 100%;
  max-width: 1500px;
`;

const BotList = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 20px;
  .new_bot {
    svg {
      width: 20px;
      margin-right: 7%;
    }
  }
`;

const BotItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 20px;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
    .icon {
      display: initial;
    }
  }
  &.selected {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .name {
    display: block;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .icon {
    display: none;
    width: 20px;
    opacity: 0.6;
  }
  .icon:hover {
    opacity: 1;
  }
`;

export default function Layout() {
  const [botList, setBotList] = useState([]);
  const [selectedBot, setSelectedBot] = useState(1);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const changeBot = (bot_id) => {
    setSelectedBot(bot_id);
  };

  const getBotList = async () => {
    const rows = await apiService.get('/bot/bot_list');
    setBotList(rows);
  };

  const openModal = (data) => {
    console.log('모달열림?');
    if (data) {
      setModalData({ mode: 'update', info: data })
    } else {
      setModalData({ mode: 'create' });
    }
    setModalOpen(true);
  };
  const closeModal = (isUpdated) => {
    setModalOpen(false);
    setModalData(null);
    if (isUpdated) {
      getBotList();
    }
  }

  useEffect(() => {
    getBotList();
  }, [])

  // const navigate = useNavigate();
  // const onLogOut = async () => {
  //   const ok = confirm('Are you sure you want to log out?');
  //   if (ok) {
  //     await auth.signOut();
  //     navigate("/login");
  //   }
  // }
  return (
    <Wrapper>
      <BotList>
        {
          botList.map((data, i) => {
            return <BotItem
              className={selectedBot === data.id ? 'selected' : ''}
              key={`bot_${i}`}
              onClick={() => changeBot(data.id)}
            >
              <BotProfile src={data.image} idx={i}/>
              <p className="name">{data.name}</p>
              <EditIcon onClick={() => openModal(data)}/>
            </BotItem>
          })
        }
        <BotItem className="new_bot" onClick={() => openModal()}>
          <PlusIcon/> 새 친구 추가
        </BotItem>
      </BotList>
      <Chat bot_id={selectedBot}/>
      { isModalOpen ? <CreateBotModal {...modalData} onClose={closeModal}/> : null}
    </Wrapper>
  );
}