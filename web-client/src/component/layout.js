// import { Outlet } from "react-router-dom";
import './layout.css';
import styled from "styled-components";
import Chat from "../router/chat";
import { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { BotProfile, EditIcon, MenuIcon, PlusIcon } from "./icon-component";
import CreateBotModal from "./create-bot-modal";
import Profile from "../router/profile";

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

export default function Layout() {
  const [userInfo, setUserInfo] = useState({});
  const [botList, setBotList] = useState([]);
  const [selectedBot, setSelectedBot] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showHiddenMenu, setShowHiddenMenu] = useState(false);

  const changeBot = (bot) => {
    setSelectedBot({id: bot.id, name: bot.name});
  };

  const getBotList = async () => {
    let rows = await apiService.get('/bot/bot_list');
    console.log('봇리스트: ', rows);
    setBotList(rows);
    // for max length test
    // while (rows.length < 15) {
    //   rows.push({ id: rows.length + 100, name: 'dummy', image: '' });
    // }
    // setBotList(rows);

    if (!selectedBot.id && rows.length) {
      changeBot(rows[0]);
    } else if (selectedBot.id && rows.length && !rows.find(r => r.id === selectedBot.id)) {
      setSelectedBot({});
    }
  };

  const getUserInfo = async () => {
    let userInfo = await apiService.post('/user/getUserInfo', 1);   // user 하나 임시
    setUserInfo(userInfo);
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

  const clickShowLeftMenu = () => {
    setShowHiddenMenu(prev => !prev);
  };

  useEffect(() => {
    getBotList();
    getUserInfo();
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
    <>
    <div className='hiddenMenu'>
      <MenuIcon onClick={clickShowLeftMenu}/>
    </div>
    <Wrapper className='layout-wrapper'>
      <Column className={`leftMenu${showHiddenMenu ? ' show' : ''}`}>
        <BotList>
          {
            botList.map((data, i) => {
              return <BotItem
                className={selectedBot.id === data.id ? 'selected' : ''}
                key={`bot_${i}`}
                onClick={() => changeBot(data)}
              >
                <BotProfile src={data.image} idx={i}/>
                <p className="name">{data.name}</p>
                <EditIcon onClick={(e) => openModal(e, data)}/>
              </BotItem>
            })
          }
          { botList.length < 15 ? <BotItem className="new_bot" onClick={(e) => openModal(e)}>
            <PlusIcon/> 새 친구 봇 추가
          </BotItem> : null}
        </BotList>
        <Profile userInfo={userInfo} onUserUpdated={getUserInfo}/>
      </Column>
      <Chat bot_id={selectedBot.id} bot_name={selectedBot.name}/>
      { isModalOpen ? <CreateBotModal {...modalData} onClose={closeModal}/> : null}
    </Wrapper>
    </>
  );
}