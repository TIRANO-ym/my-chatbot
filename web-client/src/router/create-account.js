import React, { useState } from "react";
import icon from "../assets/images/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import { Wrapper, Title, Input, Switcher, Error, Form } from "../component/common-style-component";
import { useTranslation } from "react-i18next";
// import GoogleButton from "../component/third-party-login/google-btn";

const initialValue = { name: '', email: '', password: '' };

export default function CreateAccount() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [inputValues, setInputValues] = useState(initialValue);
  const { name, email, password } = inputValues;

  const onChange = (e) => {
    const { target: {name, value} } = e;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || !name || !email || !password) {
      return;
    }

    try {
      setLoading(true);
      const res = await authService.createUser(email, password, name)
      if (res.error) {
        setError(res.error);
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Title>{t("login.join")} <img src={icon} alt="logo-image"/></Title>
      <Form onSubmit={onSubmit}>
        <Input 
          onChange={onChange}
          name="name" 
          value={name} 
          placeholder={t("login.name")} 
          type="text" 
          required
        />
        <Input 
          onChange={onChange}
          name="email" 
          value={email} 
          placeholder={t("login.email")} 
          type="email" 
          required
        />
        <Input 
          onChange={onChange}
          name="password" 
          value={password} 
          placeholder={t("login.password")} 
          type="password" 
          required
        />
        <Input 
          onChange={onChange}
          type="submit" 
          value={ isLoading ? t("login.loading") : t("login.create_account") }
        />
      </Form>
      { error ? <Error>{error ? t(`login.error.${error}`) : null}</Error> : null }
      <Switcher>
        {t("login.already_have_account")} <Link to="/login">{t("login.login")} &rarr;</Link>
      </Switcher>
      {/* <GoogleButton /> */}
    </Wrapper>
  )
}