import styled from "styled-components";
import ErrorMessage from "./error-component";
import { EditIcon, DeleteIcon, XIcon, LoadingWrapper, Loading } from "./icon-component";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { RadioGroup, Radio, Checkbox } from "./material-component";
import apiService from "../service/apiService";
import { modalStyles } from "./style-component";

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
  border-bottom: solid 1px gray;
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
  background-color: #ffffff50;
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
  color: rgb(170, 144, 202);
  font-weight: bold;
  font-size: 1.1rem;
`;
const ContentField = styled.div`
  width: 80%;
`;
const Input = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  font-size: 1.1rem;
  border-radius: 10px;
  border: solid 1px gray;
  height: 30px;
  padding: 0px 10px;
  color: white;
`;
const SelectBox = styled.select`
  background-color: rgba(0, 0, 0, 0);
  color: white;
  width: 100%;
  font-size: 1.1rem;
  height: 30px;
  padding: 0px 5px;
  border-radius: 10px;
  border: solid 1px gray;
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
  border: solid 1px gray;
  background-color: rgba(0, 0, 0, 0);
  color: white;
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
      background-color: rgb(80, 80, 80);
      cursor: default;
    }
  }
  .update {
    background-color: rgb(99, 80, 122);
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
export default function UserSettingModal({ userInfo, onClose }) {
  useEffect(() => {
    console.log('모달 열림! 인자: ', {userInfo, onClose});
  }, []);
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
    let txt = e.target.value.replace(/[~!@#$%\^&*()\-_=+\[{}\];:'",<.>\/\?\\\|`]/gi, '');
    if (txt.length > 25) {
      txt = txt.slice(0, 25);
    }
    setInputName(txt);
  }
  const handleCustomChar = (e) => {
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
      setErrMsg('이름을 입력해주세요!');
      return;
    }
    setIsUpdating(true);
    const dataset = {
      id: userInfo.id,
      name: inputName,
      custom_character: custom_character
    };
    console.log('입력한 모든 데이터들: ', );
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

  return <Modal isOpen={true} style={modalStyles} onAfterClose={onClose}>
    <ModalWrapper>
      <TopBar>
        사용자 정보 수정
        <XIcon onClick={onClose}/>
      </TopBar>
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
        <TextLabel>이름</TextLabel>
        <ContentField><Input type="text" value={inputName} onChange={handleInputName} /></ContentField>
      </Row>
      <Row>
        <TextLabel>기타 설정</TextLabel>
        <ContentField>
          <TextArea value={custom_character} onChange={handleCustomChar} placeholder="그 외 친구들이 알아야 할 나의 성격이나 특징을 직접 입력해주세요.&#10;한글 입력도 되지만, 영어로 입력 시 정확도가 올라갑니다!&#10;* 예시 1: 나는 음악 듣는 걸 좋아해. 내 취미는 노래를 들으면서 게임을 하는거야.&#10;* 예시 2: I like listening to music. My hobby is playing games while listening to songs."/>
        </ContentField>
      </Row>
    </ModalWrapper>
    
    <ModalSubmitBtn>
      <ErrorMessage message={errMsg}/>
      <button className="update" disabled={isUpdating} onClick={onSubmit}>{
        isUpdating ? <LoadingWrapper><p>저장 중... </p><Loading/></LoadingWrapper>
                  : '저장'
      }</button>
    </ModalSubmitBtn>
  </Modal>;
}