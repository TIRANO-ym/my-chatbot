import { useEffect, useState } from "react";
import styled from "styled-components";
import { SettingIcon, UserProfile } from "../component/icon-component";
import SettingModal from "../component/setting-modal/setting-modal";

const Wrapper = styled.div`
  height: 80px;
  margin-top: auto;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #00000030;
  .name {
    display: block;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .setting-icon {
    cursor: pointer;
    width: 45px;
  }
  .setting-icon:hover {
    opacity: 0.9;
  }
`;

export default function Profile({userInfo, onUserUpdated}) {
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setCurrentUserInfo(userInfo);
  }, [userInfo]);

  const openModal = () => {
    setModalOpen(true);
  };

  const onAfterClose = (isUpdated) => {
    setModalOpen(false);
    if (isUpdated) {
      onUserUpdated();
    }
  }

  return <Wrapper>
    <UserProfile src={currentUserInfo.image}/>
    <p className="name">{currentUserInfo.name}</p>
    <SettingIcon onClick={openModal}/>
    { isModalOpen ? <SettingModal userInfo={userInfo} onClose={onAfterClose}/> : null}
  </Wrapper>;
}