import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./component/layout";
import Chat from "./router/chat";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      // {
      //   path: "",
      //   element: <Chat/>
      // }
      // {
    ]
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: rgb(41, 41, 41);
    color: white;
    font-size: 1.1rem;
  }

  ::-webkit-scrollbar {
    // display:none;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
