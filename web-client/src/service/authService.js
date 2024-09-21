import apiService from "./apiService";
import CryptoJS from 'crypto-js';

const login = async (email, password) => {
  const res = await apiService.post('/user/login', {
    email,
    password: CryptoJS.SHA256(email + password).toString()
  });
  if (res.error) {
    return { result: false, error: res.error };
  } else {
    const cookie = {
      id: res.id,
      name: res.name,
      email: res.email,
      loginAt: Date.now()
    };
    // todo: 보안 강화하려면 적절한 키 추가
    const cookieStr = CryptoJS.AES.encrypt(JSON.stringify(cookie), 'key').toString();
    localStorage.setItem('loginInfo', cookieStr);
    return { result: true };
  }
};

const logout = () => {
  localStorage.removeItem('loginInfo');
  return true;
};

const checkLogin = () => {
  let loginInfo = localStorage.getItem('loginInfo');
  if (loginInfo) {
    // todo: 보안 강화하려면 적절한 키 추가
    loginInfo = CryptoJS.AES.decrypt(loginInfo, 'key');
    loginInfo = loginInfo.toString(CryptoJS.enc.Utf8);
    loginInfo = JSON.parse(loginInfo);
    if (loginInfo.id && loginInfo.name && loginInfo.email && loginInfo.loginAt) {
      return loginInfo;
    }
  }
  return null;
};

const createUser = async (email, password, name) => {
  const res = await apiService.post('/user/createUser', {
    email,
    password: CryptoJS.SHA256(email + password).toString(),
    name
  });
  if (res.error) {
    console.log(res.error);
    if (res.error === 'existEmail') {
      res.error = '이미 사용 중인 이메일입니다.';
    }
  }
  return res;
};

export const authService = {
  login,
  logout,
  checkLogin,
  createUser
};