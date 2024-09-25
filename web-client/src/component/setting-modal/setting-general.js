import styled from "styled-components";
import { useEffect, useState } from "react";
import i18n from "../../language/i18n";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../theme";

const ContentWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 40px;
  align-items: center;
`;
const TextLabel = styled.div`
  width: 20%;
  color: ${({theme}) => theme.labelColor};
  font-weight: bold;
  font-size: 1.1rem;
`;
const ContentField = styled.div`
  width: 80%;
`;

const SelectBox = styled.select`
  background-color: ${({theme}) => theme.inputBgColor};
  color: ${({theme}) => theme.textColor};
  width: 100%;
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

/*
 * userInfo: { id, image, name, custom_character }
*/
export default function SettingGeneral(props) {
  const { t } = useTranslation();
  const { setCurrentTheme } = useTheme();
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    const theme = localStorage.getItem('theme');
    setSelectedLang(lang || 'ko');
    setSelectedTheme(theme || 'dark');
  }, [])

  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
    localStorage.setItem('lang', e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  const handleSelectedTheme = (e) => {
    setSelectedTheme(e.target.value);
    localStorage.setItem('theme', e.target.value);
    setCurrentTheme(e.target.value);
  };

  return <>
    <ContentWrapper>
      <Row>
        <TextLabel>{t("setting.lang")}</TextLabel>
        <ContentField>
          <SelectBox
            onChange={handleSelectedLang} value={selectedLang}
          >
            <option value={'ko'}>한국어</option>
            <option value={'en'}>English</option>
          </SelectBox>
        </ContentField>
      </Row>
      <Row>
        <TextLabel>{t("setting.theme")}</TextLabel>
        <ContentField>
          <SelectBox
            onChange={handleSelectedTheme} value={selectedTheme}
          >
            <option value={'dark'}>Dark</option>
            <option value={'light'}>Light</option>
          </SelectBox>
        </ContentField>
      </Row>
    </ContentWrapper>
  </>;
}