import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./component/layout";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import i18n from './language/i18n';
import { useEffect, useState } from 'react';
import ProtectedRoute from './component/protected-route';
import Home from './router/home';
import Login from './router/login';
import CreateAccount from './router/create-account';
import ChangeLangBar from './component/change-lang-bar';
import theme, { ThemeContext } from './theme';

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
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
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
  const [currentTheme, setCurrentTheme] = useState('dark');

  // init
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang && ['en', 'ko'].includes(lang)) {
      i18n.changeLanguage(lang);
    }
    const ctheme = localStorage.getItem('theme');
    setCurrentTheme(ctheme ? ctheme : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ setCurrentTheme, theme: theme[currentTheme] }}>
    <ThemeProvider theme={theme[currentTheme]}>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router}/>
      </Wrapper>
    </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
