import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

import { uiContext } from "../../contexts/uiContext";

const LoginNav = ({ loggedIn, setLoggedIn }) => {
  const { toggleMenu, handleToggle } = useContext(uiContext);
  const dynamicStyles = useCallback(() => {
    if (!loggedIn) {
      if (window.innerWidth > 768) return "expanded";
      if (toggleMenu) return "show collapsed";
      return "hide collapsed";
    }
    if (window.innerWidth > 768) return "loggedin expanded";
    if (toggleMenu) return "loggedin show collapsed";
    return "loggedin hide collapsed";
  }, [toggleMenu, loggedIn]);

  return (
    <div className={`navbar-box ${dynamicStyles()}`}>
      {loggedIn ? (
        <Link
          onClick={() => setLoggedIn((prev) => !prev)}
          to="/"
          className="nav-link login-nav-link"
        >
          LOG OUT
        </Link>
      ) : (
        <>
          <Link
            onClick={handleToggle}
            className="login-nav-link navbar-link px-md-2"
            to="/login"
          >
            LOG IN
          </Link>
          <div className="login-nav-link">&#8725; &#8725;</div>
          <Link
            onClick={handleToggle}
            className="login-nav-link navbar-link px-md-2"
            to="/signup"
          >
            SIGN UP
          </Link>
        </>
      )}
    </div>
  );
};
export default LoginNav;
