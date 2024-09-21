import styled from "styled-components";

export const modalStyles = {
  overlay: {
    backgroundColor: "#000000dd",
    zIndex: 1000
  },
  content: {
    backgroundColor: "rgb(30, 30, 30)",
    minWidth: "400px",
    width: "35%",
    height: "fit-content",
    margin: "auto",
    border: "0",
    borderRadius: "10px",
    padding: "20px 40px"
  }
};

export const settingModalStyles = {
  overlay: {
    backgroundColor: "#000000dd",
    zIndex: 1000
  },
  content: {
    backgroundColor: "rgb(30, 30, 30)",
    minWidth: "400px",
    width: "45%",
    height: "fit-content",
    margin: "auto",
    border: "0",
    borderRadius: "10px",
    padding: "20px 0"
  }
};

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
  display: inline-flex;
  img {
    margin-left: 20px;
    height: 42px;
  }
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  background-color: #00000070;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    font-weight: bold;
    background-color: rgb(99, 80, 122);
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 500;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;