import styled from "styled-components"
// import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Wrapper = styled.div`
`;

export default function GoogleButton() {
  const clientId ="";   // own Google API key
  
  // const navigate = useNavigate();
  // const onClick = async () => {
  //   try {
  //     // todo: 외부로그인
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    // <Button onClick={onClick}>
    //   <Logo src={icon} />
    //   Continue with Google
    // </Button>
    <Wrapper>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(jwtDecode(credentialResponse.credential));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </Wrapper>
  )
}