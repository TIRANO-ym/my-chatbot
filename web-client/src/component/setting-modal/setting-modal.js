import styled from "styled-components";
import { XIcon } from "../icon-component";
import { useState } from "react";
import Modal from "react-modal";
import { settingModalStyles } from "../common-style-component";
import SettingUser from "./setting-user";
import SettingGeneral from "./setting-general";
import { useTranslation } from "react-i18next";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
  padding: 0 30px;
  padding-bottom: 10px;
  margin-top: -5px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px -2px black;
  svg {
    width: 40px;
    cursor: pointer;
  }
  svg:hover {
    opacity: 0.8;
  }
`;
const ModalWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  height: 100%;
  min-height: 550px;
  display: grid;
  // gap: 40px;
  grid-template-columns: 20% 80%;
  padding-top: 20px;
  padding-bottom: 60px;
  padding-right: 40px;
`;
const Column = styled.div`
`;

const MenuList = styled.div`
  height: 100%;
  border-right: solid 1px rgba(0, 0, 0, 0.1);
  .selected {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
`;
const Menu = styled.div`
  border-radius: 10px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 40px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
  }
`;


/*
 * userInfo: { id, image, name, custom_character }
*/
export default function SettingModal({ userInfo, onClose }) {
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState('user');

  const onChangeMenu = (menu) => {
    if (menu !== selectedMenu) {
      setSelectedMenu(menu);
    }
  }

  return <Modal isOpen={true} style={settingModalStyles}>
    <TopBar>
      {t("setting.title")}
      <XIcon onClick={() => onClose()}/>
    </TopBar>
    <ModalWrapper>
      <Column>
        <MenuList>
          <Menu onClick={() => onChangeMenu('user')} className={selectedMenu === 'user' ? 'selected' : ''}>
            {t("setting.user")}
          </Menu>
          <Menu onClick={() => onChangeMenu('general')} className={selectedMenu === 'general' ? 'selected' : ''}>
            {t("setting.general")}
          </Menu>
        </MenuList>
      </Column>
      <Column>
        {selectedMenu === 'user' ? <SettingUser userInfo={userInfo} onClose={onClose}/> : null}
        {selectedMenu === 'general' ? <SettingGeneral /> : null}
      </Column>
    </ModalWrapper>
  </Modal>;
}