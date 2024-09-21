import React, { useState } from "react";
import icon from "../assets/images/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import { Wrapper, Title, Input, Switcher, Error, Form } from "../component/common-style-component";
import { useTranslation } from "react-i18next";
// import GoogleButton from "../component/third-party-login/google-btn";

export default function Login() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { target: {name, value} } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } 
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || !email || !password) {
      return;
    }

    try {
      setLoading(true);
      const res = await authService.login(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      // setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Title>{t("login.log_into")}  <img src={icon} alt="logo-image"/></Title>
      <Form onSubmit={onSubmit}>
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
          value={ isLoading ? t("login.loading") : t("login.login") }
        />
      </Form>
      { error ? <Error>{error}</Error> : null }
      <Switcher>
        {t("login.dont_have_account")} <Link to="/create-account">{t("login.create_one")} &rarr;</Link>
      </Switcher>
      {/* <GoogleButton /> */}
    </Wrapper>
  )
}