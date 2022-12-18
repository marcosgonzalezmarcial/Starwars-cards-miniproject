import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import "./ToggleMenuBtn/toggle-btn.scss";

const LoginNav = ({ loggedIn, setLoggedIn, toggleMenu }) => {
  const dynamicStyles = () => {
    if (window.innerWidth > 768) return "expanded";
    if (toggleMenu) return "show collapsed";
    return "hide collapsed";
  };

  return loggedIn ? (
    <div className={`navbar-box ${dynamicStyles()}`}>
      <span></span>
      <Link
        onClick={() => setLoggedIn(!loggedIn)}
        to="/"
        className="nav-link login-nav-link"
      >
        LOG OUT
      </Link>
      <span></span>
    </div>
  ) : (
    <div className={`navbar-box ${dynamicStyles()}`}>
      <Link className="login-nav-link navbar-link px-md-2" to="/login">
        LOG IN
      </Link>
      <div className="login-nav-link">&#8725; &#8725;</div>
      <Link className="login-nav-link navbar-link px-md-2" to="/signup">
        SIGN UP
      </Link>
    </div>
  );
};
export default LoginNav;
