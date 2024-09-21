import styled from "styled-components"
import i18n from "../language/i18n";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div``;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SelectBox = styled.select`
  background-color: #00000070;
  color: white;
  width: 120px;
  font-size: 1.1rem;
  height: 30px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 0;
  option {
    color: black;
    font-size: 1rem;
  }
`;

export default function ChangeLangBar() {
  const [selectedLang, setSelectedLang] = useState('');
  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
    localStorage.setItem('lang', e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang && ['en', 'ko'].includes(lang)) {
      setSelectedLang(lang);
    }
  }, []);

  return <Wrapper>
    <TopBar>
      <SelectBox style={{textAlign: 'center'}}
        onChange={handleSelectedLang} value={selectedLang}
      >
        <option value={'ko'}>한국어</option>
        <option value={'en'}>English</option>
      </SelectBox>
    </TopBar>
    <Outlet/>
  </Wrapper>
}