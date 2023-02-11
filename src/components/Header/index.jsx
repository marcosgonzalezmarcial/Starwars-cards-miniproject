import smallLogo from "assets/sw_logo_mobile.png";
import bigLogo from "assets/star-wars-logo.jpg";
import { Link } from "react-router-dom";
import SectionNav from "components/Header/SectionNav";
import LoginNav from "components/Header/LoginNav";
import ToggleLoginMenuBtn from "components/Header/ToggleLoginMenuBtn";
import SearchButton from "components/Header/SearchButton";
import SearchModal from "components/SearchModal";
import "./Header.scss";
import { SearchModalCtxProvider } from "contexts/SearchModalCtx";
import { LoginMenuCtxProvider } from "contexts/LoginMenuCtx";

const Header = ({ loggedIn, setLoggedIn }) => {
  return (
    <header className="main-header">
      <div className="main-header__container">
        <Link to="/">
          <picture>
            <source media="(max-width: 767px)" srcSet={smallLogo} />
            <source media="(min-width: 768px)" srcSet={bigLogo} />
            <img className="main-header__logo" src={smallLogo} alt="logo" />
          </picture>
        </Link>
        <SearchModalCtxProvider>
          <SearchButton loggedIn={loggedIn} />
          <SearchModal />
        </SearchModalCtxProvider>
        <span></span>
        <LoginMenuCtxProvider>
          <ToggleLoginMenuBtn />
          <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </LoginMenuCtxProvider>
        <span></span>
      </div>
      <SectionNav />
    </header>
  );
};

export default Header;
