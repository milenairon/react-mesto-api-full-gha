import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Header({ email, anotherPage, pathPage, onClick }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Место. Россия" />
      <div className="header__box">
      <p className="header__email">{email}</p>
      <Link onClick={onClick} className="header__link-another-page" to={pathPage}>
        {anotherPage}
      </Link>
      </div>
    </header>
  );
}
