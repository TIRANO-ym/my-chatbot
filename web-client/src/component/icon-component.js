import styled from "styled-components";

export const EditIcon = ({onClick}) => {
  return <svg onClick={onClick} className="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path clipRule="evenodd" fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>;
};

export const PlusIcon = () => {
  return <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>;
}

export const DeleteIcon = ({onClick}) => {
  return <svg onClick={onClick} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
</svg>;
};

export const XIcon = ({onClick}) => {
  return <svg onClick={onClick} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>;
};

export const ProfileIcon = () => {
  return <svg fill="white" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>;
};

export const SettingIcon = ({onClick}) => {
  return <svg className="setting-icon" onClick={onClick} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
</svg>;
};

export const MenuIcon = ({onClick}) => {
  return <svg onClick={onClick} className="menu-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" />
</svg>;
};

export const LogoutIcon = ({onClick}) => {
  return <svg onClick={onClick} fill="tomato" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" />
  <path clipRule="evenodd" fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" />
</svg>;
};

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Loading = styled.div`
  width: 25px;
  padding: 5px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #1d9bf0;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
  @keyframes l3 {to{transform: rotate(1turn)}}
`;

const ImgBox = styled.div`
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 7%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export const BotProfile = ({ src, idx }) => {
  const palette = ['#6495ED', '#00BFFF', '#32BEBE', '#FF9E9B', '#E1B771'];
  if (src) {
    return <ImgBox className="imgBox"><img src={src} alt="bot_profile_image"/></ImgBox>
  } else {
    return <ImgBox style={{backgroundColor: palette[idx % palette.length]}}/>
  }
}

const ProfileImgBox = styled.div`
  min-width: 45px;
  min-height: 45px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 7%;
  overflow: hidden;
  background-color: rgb(90, 90, 90);
  img {
    width: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 60%;
  }
`;

export const UserProfile = ({ src }) => {
  if (src) {
    return <ProfileImgBox><img src={src} alt="user_profile_image"/></ProfileImgBox>
  } else {
    return <ProfileImgBox><ProfileIcon/></ProfileImgBox>
  }
}

const BatteryLoading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(184 157 217 / 4%);
  .loader {
    width: 80px;
    height: 40px;
    color: #000;
    border: 2px solid rgb(184 157 217);
    border-right-color: transparent;
    padding: 3px;
    background: 
      repeating-linear-gradient(90deg,rgb(184 157 217) 0 10px,#0000 0 15px) 
      0/0% no-repeat content-box content-box;
    position: relative;
    box-sizing: border-box;
    animation: l5 2s infinite steps(6);
  }
  .loader::before {
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: 100%;
    width: 10px;
    background:
      linear-gradient(
          #0000   calc(50% - 7px),rgb(184 157 217) 0 calc(50% - 5px),
          #0000 0 calc(50% + 5px),rgb(184 157 217) 0 calc(50% + 7px),#0000 0) left /100% 100%,
      linear-gradient(rgb(184 157 217) calc(50% - 5px),#0000        0 calc(50% + 5px),rgb(184 157 217) 0) left /2px 100%,
      linear-gradient(#0000        calc(50% - 5px),rgb(184 157 217) 0 calc(50% + 5px),#0000        0) right/2px 100%;
    background-repeat:no-repeat;
  }
  @keyframes l5 {
      100% {background-size:120%}
  }
`;

export const BatteryLoader = () => {
  return <BatteryLoading><div className="loader"></div></BatteryLoading>;
}

const TalkingLoading = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  .loader {
    width: 15px;
    aspect-ratio: 1;
    border-radius: 50%;
    animation: l5 1s infinite linear alternate;
  }
  @keyframes l5 {
      0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000 }
      33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002}
      66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002}
      100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000 }
  }
`;
export const BotTalkingLoader = () => {
  return <TalkingLoading><div className="loader"></div></TalkingLoading>;
}