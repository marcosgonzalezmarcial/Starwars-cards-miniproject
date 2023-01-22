import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { UiContext } from "contexts/UiContext";
import "../Header.scss";
import "./LoginNav.scss";

const LoginNav = ({ loggedIn, setLoggedIn }) => {
  const { toggleMenu, handleToggle } = useContext(UiContext);

  console.log("LoginNav render");

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

  const handleCLickLogin = useCallback(
    () => setLoggedIn((prev) => !prev),
    [setLoggedIn]
  );

  return (
    <div className={`navbar-box ${dynamicStyles()}`}>
      {loggedIn ? (
        <Link
          onClick={handleCLickLogin}
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
