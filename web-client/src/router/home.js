import styled from "styled-components";
import Chat from "./chat";
import { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { BotProfile, EditIcon, PlusIcon } from "../component/icon-component";
import CreateBotModal from "../component/create-bot-modal";
import Profile from "./profile";
import { useTranslation } from 'react-i18next';
import { authService } from "../service/authService";
import { useOutletContext } from 'react-router-dom';

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: 20% 3fr;
  padding: 50px;
  width: 100%;
  max-width: 1500px;
  height: 100%;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
    width: 30px;
    opacity: 0.6;
  }
  .icon:hover {
    opacity: 1;
  }
`;

export default function Home() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({}); // userInfo: { id, image, name, custom_character }
  const [botList, setBotList] = useState([]);
  const [selectedBot, setSelectedBot] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const props = useOutletContext();

  const changeBot = (bot, idx) => {
    setSelectedBot({id: bot.id, name: bot.name, image: bot.image, idx: idx});
  };

  const getBotList = async () => {
    let rows = await apiService.get(`/bot/bot_list/${userInfo.id}`);
    setBotList(rows);
    // for max length test
    // while (rows.length < 15) {
    //   rows.push({ id: rows.length + 100, name: 'dummy', image: '' });
    // }
    // setBotList(rows);

    if (selectedBot.id && rows.length && !rows.find(r => r.id === selectedBot.id)) {
      setSelectedBot({});
    }
  };

  const getUserInfo = async () => {
    const loginInfo = authService.checkLogin();
    let userInfo = await apiService.post('/user/getUserInfo', loginInfo.id);
    setUserInfo(userInfo);
    return true;
  };

  const openModal = (e, data) => {
    e.stopPropagation();
    if (data) {
      setModalData({ mode: 'update', info: data, userInfo: {
        id: userInfo.id, name: userInfo.name, custom_character: userInfo.custom_character
      } })
    } else {
      setModalData({ mode: 'create', userInfo: {
        id: userInfo.id, name: userInfo.name, custom_character: userInfo.custom_character
      } });
    }
    setModalOpen(true);
  };
  const closeModal = (isUpdated) => {
    setModalOpen(false);
    setModalData(null);
    if (isUpdated) {
      getBotList();
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (userInfo.id) {
      getBotList();
    }
  }, [userInfo])

  return <Wrapper className='layout-wrapper'>
  <Column className={`leftMenu${props.showLeftMenu ? ' show' : ''}`}>
    <BotList>
      {
        botList.map((data, i) => {
          return <BotItem
            className={selectedBot.id === data.id ? 'selected' : ''}
            key={`bot_${i}`}
            onClick={() => changeBot(data, i)}
          >
            <BotProfile src={data.image} idx={i}/>
            <p className="name">{data.name}</p>
            <EditIcon onClick={(e) => openModal(e, data)}/>
          </BotItem>
        })
      }
      { botList.length < 15 ? <BotItem className="new_bot" onClick={(e) => openModal(e)}>
        <PlusIcon/> {t("home.add_new_bot")}
      </BotItem> : null}
    </BotList>
    <Profile userInfo={userInfo} onUserUpdated={getUserInfo}/>
  </Column>
  <Chat bot_id={selectedBot.id} bot_name={selectedBot.name} bot_image={selectedBot.image} idx={selectedBot.idx}/>
  { isModalOpen ? <CreateBotModal {...modalData} onClose={closeModal}/> : null}
</Wrapper>;
}