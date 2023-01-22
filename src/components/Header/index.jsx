import { Navbar } from "react-bootstrap";
import smallLogo from "assets/sw_logo_mobile.png";
import bigLogo from "assets/star-wars-logo.jpg";
import { Link } from "react-router-dom";
import SectionNav from "components/Header/SectionNav";
import LoginNav from "components/Header/LoginNav";
import TogglLoginMenuBtn from "components/Header/TogglLoginMenuBtn";
import SearchButton from "components/Header/SearchButton";
import SearchModal from "components/SearchModal";
import "./Header.scss";
import { UiContextProvider } from "contexts/UiContext";

const Header = ({ loggedIn, setLoggedIn }) => {
  console.log("Header render");

  return (
    <header className="header">
      <Navbar variant="dark" className="py-1">
        <div className="navbar-container text-center position-relative justify-content-end px-0">
          <UiContextProvider>
            <TogglLoginMenuBtn />
            <SearchModal />
            <Navbar.Brand className="m-0 py-3 px-2 p-md-0">
              <Link className="navbar-link p-2" to="/">
                <picture>
                  <source media="(max-width: 767px)" srcSet={smallLogo} />
                  <source media="(min-width: 768px)" srcSet={bigLogo} />
                  <img className="logo-img" src={smallLogo} alt="logo" />
                </picture>
              </Link>
            </Navbar.Brand>
            <SearchButton loggedIn={loggedIn} />
            <span></span>
            <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <span></span>
          </UiContextProvider>
        </div>
      </Navbar>
      <SectionNav />
    </header>
  );
};

export default Header;
