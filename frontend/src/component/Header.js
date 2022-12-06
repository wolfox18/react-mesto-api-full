import React from "react";
import logoPath from "../images/logo-mesto.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, email, onLogout }) {
  const location = useLocation();
  const link =
    location.pathname === "/sign-in" ? (
      <Link className="header__link transparent-btn" to="/sign-up">
        Регистрация
      </Link>
    ) : (
      <Link className="header__link transparent-btn" to="/sign-in">
        Войти
      </Link>
    );
  return (
    <header className="header">
      <a href="#" className="logo">
        <img
          src={logoPath}
          alt="Логотип Mesto Russia"
          className="logo__image"
        />
      </a>
      <div className="header__login-container">
        <p className="header__email">{isLoggedIn ? email : ""}</p>
        {isLoggedIn ? (
          <button className="header__link transparent-btn" onClick={onLogout}>
            Выйти
          </button>
        ) : link}
      </div>
    </header>
  );
}
export default Header;
