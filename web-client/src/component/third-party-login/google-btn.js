import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.png";

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: bold;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      // todo: 외부로그인
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src={icon} />
      Continue with Google
    </Button>
  )
}