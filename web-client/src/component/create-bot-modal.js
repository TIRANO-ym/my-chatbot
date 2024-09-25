import styled from "styled-components";
import ErrorMessage from "./error-component";
import { EditIcon, DeleteIcon, XIcon, LoadingWrapper, Loading } from "./icon-component";
import { useState } from "react";
import Modal from "react-modal";
import { RadioGroup, Radio, Checkbox } from "./material-component";
import apiService from "../service/apiService";
import { modalStyles } from "./common-style-component";
import { useTranslation } from "react-i18next";
import { useTheme } from "../theme";

const ModalWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  height: 100%;
  min-height: 300px;
  display: grid;
  gap: 40px;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% + 80px);
  font-size: 1.2rem;
  padding: 0 20px;
  padding-bottom: 10px;
  margin-top: -5px;
  margin-bottom: 10px;
  margin-left: -40px;
  margin-right: -40px;
  // border-bottom: solid 1px gray;
  box-shadow: 0 4px 8px -2px black;
  svg {
    width: 40px;
    cursor: pointer;
  }
  svg:hover {
    opacity: 0.8;
  }
`;
const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const PhotoUpload = styled.label`
  width: 150px;
  overflow: hidden;
  height: 150px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.photoBgColor};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .phoho-edit-options {
    display: none;
    background-color: #00000090;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 5px;
    color: white;
    svg:hover {
      opacity: 0.8;
    }
  }
  svg {
    width: 100px;
  }
  &:hover {
    .phoho-edit-options {
      display: flex !important;
    }
  }
`;
const Photo = styled.img`
  width: 100%;
`;
const PhotoInput = styled.input`
  display: none;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 40px;
  align-items: center;
`;
const TextLabel = styled.div`
  width: 20%;
  color: ${({theme}) => theme.labelColor};
  font-weight: bold;
  font-size: 1.1rem;
`;
const ContentField = styled.div`
  width: 80%;
`;
const Input = styled.input`
  background-color: ${({theme}) => theme.inputBgColor};
  width: 100%;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 0;
  height: 30px;
  padding: 0px 10px;
  color: ${({theme}) => theme.textColor};
`;
const SelectBox = styled.select`
  background-color: ${({theme}) => theme.inputBgColor};
  color: ${({theme}) => theme.textColor};
  width: 100%;
  font-size: 1.1rem;
  height: 30px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 0;
  option {
    color: black;
    font-size: 1rem;
  }
`;
const MbtiSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  overflow-y: auto;
  resize: none;
  border-radius: 10px;
  border: 0;
  background-color: ${({theme}) => theme.inputBgColor};
  color: ${({theme}) => theme.textColor};
  padding: 10px;
  font-family: var(--font-nanumfont);
  font-size: 1.1rem;
  &::placeholder {
    font-size: 1rem;
  }
`;

const ModalSubmitBtn = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;
  width: 100%;
  justify-content: right;
  align-items: center;
  font-family: var(--font-nanumfont);
  button {
    border: none;
    padding: 4px 10px;
    border-radius: 10px;
    cursor: pointer;
    min-width: 100px;
    &:hover,
    &:active {
      opacity: 0.9;
    }
    &:disabled {
      background-color: ${({theme}) => theme.disabledBgColor};
      cursor: default;
    }
  }
  .update {
    background-color: ${({theme}) => theme.submitBtnBgColor};
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    p {
      margin-right: 10px;
    }
  }
  .delete {
    background-color: tomato;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .errMsg {
    width: fit-content;
    padding: 0 20px;
  }
`;

/*
 * mode: 'create' or 'update'
 * info: if 'update' mode, there is exist bot infos. { id, image, name, age, sex, mbti, custom_character }
 * userInfo: { id, name, custom_character }
*/
export default function CreateBotModal({ mode, info, userInfo, onClose }) {
  const { t } = useTranslation();
  const [editPhoto, setEditPhoto] = useState(null);
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [deletePhoto, setDeletePhoto] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const { theme } = useTheme();
  const modalStyle = {
    overlay: {
      backgroundColor: "#000000dd",
      zIndex: 1000
    },
    content: {
      backgroundColor: theme.modal.backgroundColor,
      minWidth: "400px",
      width: "35%",
      height: "fit-content",
      margin: "auto",
      border: "0",
      borderRadius: "10px",
      padding: "20px 40px"
    }
  };

  // --------- 사용자 입력 폼 ---------
  const [inputName, setInputName] = useState(info && info.name ? info.name : '');
  const [selectAge, setSelectAge] = useState(info && info.age ? info.age : '');
  const [selectSex, setSelectSex] = useState(info && info.sex ? info.sex : '');
  const [isMbtiFlag, setMbtiFlag] = useState(info && !info.mbti ? false : true);
  const [selectMbti, setSelectMbti] = useState(info && info.mbti ? info.mbti.split('') : ['i', 's', 't', 'j']);
  const [custom_character, setCustomCharacter] = useState(info && info.custom_character ? info.custom_character : '');
  // ---------------------------------

  const handleInputName = (e) => {
    // eslint-disable-next-line
    let txt = e.target.value.replace(/[~!@#$%\^&*()\-_=+\[{}\];:'",<.>\/\?\\\|`]/gi, '');
    if (txt.length > 25) {
      txt = txt.slice(0, 25);
    }
    setInputName(txt);
  }
  const handleSelectAge = (e) => {
    setSelectAge(e.target.value);
  };
  const handleSelectMbti = (idx, value) => {
    setSelectMbti(prev => {
      prev[idx] = value;
      return [...prev];
    });
  };
  const handleCustomChar = (e) => {
    // eslint-disable-next-line
    setCustomCharacter(e.target.value.replace(/[@#$%\^&\-_{}:"<>\/\?]/gi, ''));
  }
  // ---------------------------------

  const onPhotoChange = async (e) => {
    const {files} = e.target;
    if (files && files.length) {
      let file = files[0];
      setEditPhoto(file);
      // 임시 파일 url 지정
      if (FileReader) {
        var fr = new FileReader();
        fr.onload = () => {
          setDeletePhoto(false);
          setErrMsg('');
          setEditPhotoUrl(`${fr.result}`);
        };
        fr.readAsDataURL(file);
      }
    }
  };
  const onPhotoDelete = (e) => {
    e.preventDefault();
    setEditPhoto(null);
    setEditPhotoUrl('');
    setDeletePhoto(true);
  };

  const onSubmit = async() => {
    if (isUpdating) return;
    if (!inputName) {
      setErrMsg(t("bot_setting.error.name_empty"));
      return;
    }
    setIsUpdating(true);
    const dataset = {
      name: inputName,
      age: selectAge,
      sex: selectSex,
      mbti: isMbtiFlag ? selectMbti.join('') : '',
      custom_character: custom_character,
      userInfo: userInfo
    };
    let botId = info ? info.id : null;
    if (mode === 'create') {
      botId = await apiService.post('/bot/create_bot', dataset);
    } else {
      await apiService.post('/bot/update_bot', {...dataset, id: info.id});
    }

    // 이미지 파일 별도 처리
    if (deletePhoto) {
      await apiService.post('/bot/delete_bot_image', {id: botId});
    } else if (editPhoto) {
      const renamedFile = new File([editPhoto], `bot_${botId}`, {
        type: editPhoto.type,
        lastModified: editPhoto.lastModified,
      });
      const formData = new FormData();
      formData.append('file', renamedFile);
      await apiService.postFile('/bot/bot_profile_image', formData);
    }
    onClose(true);
  };
  const deleteClick = async() => {
    if (isUpdating) return;
    const ok = window.confirm(t("bot_setting.confirm.delete1").replace('{BOT_NAME}', info.name));
    if (!ok) return;
    const finallyOk = window.confirm(t("bot_setting.confirm.delete2"));
    if (!finallyOk) return;

    setIsUpdating(true);
    await apiService.post('/bot/delete_bot', {id: info.id});
    onClose(true);
  }

  return <Modal isOpen={true} style={modalStyle}>
    <ModalWrapper>
      <TopBar>
        { mode === 'create' ? t("bot_setting.create_title") : t("bot_setting.update_title").replace('{BOT_NAME}', info.name)}
        <XIcon onClick={() => onClose()}/>
      </TopBar>
      <PhotoWrapper>
        <PhotoUpload htmlFor="photo">
          <div className="phoho-edit-options">
            <EditIcon/> <DeleteIcon onClick={onPhotoDelete}/>
          </div>
          {(!deletePhoto && (editPhoto || info?.image)) ? (
            <Photo src={(editPhotoUrl || info?.image)} />
          ) : (
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          )}
        </PhotoUpload>
        <PhotoInput
          onChange={onPhotoChange} 
          id="photo" 
          type="file" 
          accept="image/*" 
        />
      </PhotoWrapper>
      <Row>
        <TextLabel>{t("bot_setting.name")}</TextLabel>
        <ContentField><Input type="text" value={inputName} onChange={handleInputName} /></ContentField>
      </Row>
      <Row>
        <TextLabel>{t("bot_setting.age")}</TextLabel>
        <ContentField>
          <SelectBox
            onChange={handleSelectAge} value={selectAge}
          >
            <option value={''}>{t("bot_setting.no_set")}</option>
            <option value={'10'}>{t("bot_setting.10age")}</option>
            <option value={'20'}>{t("bot_setting.20age")}</option>
            <option value={'30'}>{t("bot_setting.20age")}</option>
          </SelectBox>
        </ContentField>
      </Row>
      <Row>
        <TextLabel>{t("bot_setting.sex")}</TextLabel>
        <ContentField>
          <RadioGroup value={selectSex} onChange={setSelectSex}>
            <Radio name="option" value={''} defaultChecked>{t("bot_setting.no_set")}</Radio>
            <Radio name="option" value={'m'}>{t("bot_setting.male")}</Radio>
            <Radio name="option" value={'f'}>{t("bot_setting.female")}</Radio>
          </RadioGroup>
        </ContentField>
      </Row>
      <Row>
        <TextLabel>MBTI</TextLabel>
        <ContentField>
          <Checkbox checked={isMbtiFlag} onChange={setMbtiFlag}>
            {t("bot_setting.using")}
          </Checkbox>
        </ContentField>
      </Row>
      {isMbtiFlag ? <Row style={{marginTop: '-20px'}}>
        <TextLabel></TextLabel>
        <ContentField>
          <MbtiSelectWrapper>
            <SelectBox style={{textAlign: 'center'}}
              onChange={(e) => {handleSelectMbti(0, e.target.value)}} value={selectMbti[0]}
            >
              <option value={'i'}>I</option>
              <option value={'e'}>E</option>
            </SelectBox>
            <SelectBox style={{textAlign: 'center'}}
              onChange={(e) => {handleSelectMbti(1, e.target.value)}} value={selectMbti[1]}
            >
              <option value={'s'}>S</option>
              <option value={'n'}>N</option>
            </SelectBox>
            <SelectBox style={{textAlign: 'center'}}
              onChange={(e) => {handleSelectMbti(2, e.target.value)}} value={selectMbti[2]}
            >
              <option value={'t'}>T</option>
              <option value={'f'}>F</option>
            </SelectBox>
            <SelectBox style={{textAlign: 'center'}}
              onChange={(e) => {handleSelectMbti(3, e.target.value)}} value={selectMbti[3]}
            >
              <option value={'j'}>J</option>
              <option value={'p'}>P</option>
            </SelectBox>
          </MbtiSelectWrapper>
        </ContentField>
      </Row> : null}
      <Row>
        <TextLabel>{t("bot_setting.etc_setting")}</TextLabel>
        <ContentField>
          <TextArea value={custom_character} onChange={handleCustomChar} placeholder={t("bot_setting.etc_setting_placeholder")}/>
        </ContentField>
      </Row>
    </ModalWrapper>
    
    <ModalSubmitBtn>
      <ErrorMessage message={errMsg}/>
      <button className="update" disabled={isUpdating} onClick={onSubmit}>{
        isUpdating ? <LoadingWrapper><p>{t("bot_setting.creating_model")} </p><Loading/></LoadingWrapper>
                  : (mode === 'create') ? t("bot_setting.create") : t("bot_setting.update")
      }</button>
      {mode === 'update' ? <button className="delete" disabled={isUpdating} onClick={deleteClick}>{
        isUpdating ? <LoadingWrapper><Loading/></LoadingWrapper>
                  : t("bot_setting.delete")
      }</button> : null}
    </ModalSubmitBtn>
  </Modal>;
}