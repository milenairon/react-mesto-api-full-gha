//Регистрация path="/sign-in"
import React from "react";
import { Link } from "react-router-dom";
import AuthPage from "./AuthPage";

export default function Register({
  onSubmit,
  handleChangeInput,
  email,
  password,
}) {
  return (
    <AuthPage
      name="register"
      titleText="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={onSubmit}
      handleChangeInput={handleChangeInput}
      email={email}
      password={password}
    >
      <Link className="popup__link-another-page" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </AuthPage>
  );
}
