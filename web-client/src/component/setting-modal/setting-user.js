import styled from "styled-components";
import ErrorMessage from "../error-component";
import { EditIcon, DeleteIcon, LoadingWrapper, Loading } from "../icon-component";
import { useState } from "react";
import apiService from "../../service/apiService";
import { useTranslation } from "react-i18next";

const ContentWrapper = styled.div`
  width: 100%;
  // min-width: 300px;
  height: 100%;
  // min-height: 300px;
  display: grid;
  gap: 40px;
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

const SubmitBtn = styled.div`
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
  .errMsg {
    width: fit-content;
    padding: 0 20px;
  }
`;

/*
 * userInfo: { id, image, name, custom_character }
*/
export default function SettingUser({ userInfo, onClose }) {
  const { t } = useTranslation();
  const [editPhoto, setEditPhoto] = useState(null);
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [deletePhoto, setDeletePhoto] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // --------- 사용자 입력 폼 ---------
  const [inputName, setInputName] = useState(userInfo.name ? userInfo.name : '');
  const [custom_character, setCustomCharacter] = useState(userInfo.custom_character ? userInfo.custom_character : '');
  // ---------------------------------

  const handleInputName = (e) => {
    // eslint-disable-next-line
    let txt = e.target.value.replace(/[~!@#$%\^&*()\-_=+\[{}\];:'",<.>\/\?\\\|`]/gi, '');
    if (txt.length > 25) {
      txt = txt.slice(0, 25);
    }
    setInputName(txt);
  }
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
      setErrMsg(t("setting.error.name_empty"));
      return;
    }
    setIsUpdating(true);
    const dataset = {
      id: userInfo.id,
      name: inputName,
      custom_character: custom_character
    };
    await apiService.post('/user/update_user', dataset);

    // 이미지 파일 별도 처리
    if (deletePhoto) {
      await apiService.post('/user/delete_user_image', {id: userInfo.id});
    } else if (editPhoto) {
      const renamedFile = new File([editPhoto], `user_${userInfo.id}`, {
        type: editPhoto.type,
        lastModified: editPhoto.lastModified,
      });
      const formData = new FormData();
      formData.append('file', renamedFile);
      await apiService.postFile('/user/user_profile_image', formData);
    }
    onClose(true);
  };

  return <>
    <ContentWrapper>
      <PhotoWrapper>
        <PhotoUpload htmlFor="photo">
          <div className="phoho-edit-options">
            <EditIcon/> <DeleteIcon onClick={onPhotoDelete}/>
          </div>
          {(!deletePhoto && (editPhoto || userInfo.image)) ? (
            <Photo src={(editPhotoUrl || userInfo.image)} />
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
        <TextLabel>{t("setting.name")}</TextLabel>
        <ContentField><Input type="text" value={inputName} onChange={handleInputName} /></ContentField>
      </Row>
      <Row>
        <TextLabel>{t("setting.etc_setting")}</TextLabel>
        <ContentField>
          <TextArea value={custom_character} onChange={handleCustomChar} placeholder={t("setting.etc_setting_placeholder")}/>
        </ContentField>
      </Row>
    </ContentWrapper>
    
    <SubmitBtn>
      <ErrorMessage message={errMsg}/>
      <button className="update" disabled={isUpdating} onClick={onSubmit}>{
        isUpdating ? <LoadingWrapper><p>{t("setting.isSaving")} </p><Loading/></LoadingWrapper>
                  : t("setting.save")
      }</button>
    </SubmitBtn>
  </>;
}