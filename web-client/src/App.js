import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./component/layout";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import i18n from './language/i18n';
import { useEffect } from 'react';
import ProtectedRoute from './component/protected-route';
import Home from './router/home';
import Login from './router/login';
import CreateAccount from './router/create-account';
import ChangeLangBar from './component/change-lang-bar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home/>
      }
    ]
  },
  {
    path: "/login",
    element: <ChangeLangBar/>,
    children: [
      {
        path: "",
        element: <Login/>
      }
    ]
  },
  {
    path: "/create-account",
    element: <ChangeLangBar/>,
    children: [
      {
        path: "",
        element: <CreateAccount/>
      }
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
  // init
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang && ['en', 'ko'].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
