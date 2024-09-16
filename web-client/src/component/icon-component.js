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
    return <ImgBox><img src={src}/></ImgBox>
  } else {
    return <ImgBox style={{backgroundColor: palette[idx % palette.length]}}/>
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