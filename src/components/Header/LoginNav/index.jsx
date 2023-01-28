import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useLoginMenuCtx } from "contexts/LoginMenuCtx";
import "../Header.scss";
import "./LoginNav.scss";

const LoginNav = ({ loggedIn, setLoggedIn }) => {
  const [toggleMenu, handleToggle] = useLoginMenuCtx();

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
    <nav className={`login-nav ${dynamicStyles()}`}>
      {loggedIn ? (
        <Link onClick={handleCLickLogin} to="/" className="login-nav__link">
          LOG OUT
        </Link>
      ) : (
        <>
          <Link
            onClick={handleToggle}
            className="login-nav__link  px-md-2"
            to="/login"
          >
            LOG IN
          </Link>
          <div className="login-nav__link">&#8725; &#8725;</div>
          <Link
            onClick={handleToggle}
            className="login-nav__link px-md-2"
            to="/signup"
          >
            SIGN UP
          </Link>
        </>
      )}
    </nav>
  );
};
export default LoginNav;
