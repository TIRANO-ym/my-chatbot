import { Outlet } from "react-router-dom";
import './layout.css';
import { useState } from "react";
import { LogoutIcon, MenuIcon } from "./icon-component";
import { useNavigate } from 'react-router-dom';
import { authService } from "../service/authService";
// import Home from '../router/home';



export default function Layout() {
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  const clickShowLeftMenu = () => {
    setShowLeftMenu(prev => !prev);
  };

  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = window.confirm('로그아웃 하시겠습니까?');
    if (ok) {
      authService.logout();
      navigate("/login");
    }
  }
  return (
    <>
    <div className='navBar'>
      <MenuIcon onClick={clickShowLeftMenu}/>
      <LogoutIcon onClick={onLogOut}/>
    </div>
    <Outlet context={{showLeftMenu}}/>
    </>
  );
}