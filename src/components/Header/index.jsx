import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import smallLogo from "../../assets/sw_logo_mobile.png";
import bigLogo from "../../assets/star-wars-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import SectionNav from "./SectionNav";
import LoginNav from "./LoginNav";
import SearchIcon from "../SearchIcon/SearchIcon";
import SearchModal from "../SearchModal/SearchModal";
import "./Header.scss";

const Header = ({ loggedIn, setLoggedIn }) => {
  const [modalShow, setModalShow] = useState(false);
  let navigate = useNavigate();

  const handleSearchClick = () => {
    if (loggedIn) {
      setModalShow(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <header className="header">
      <Navbar variant="dark" className="py-1" expand="md">
        <div className="navbar-container text-center position-relative justify-content-end px-0">
          <Navbar.Toggle
            className="navbar-toggle-btn me-auto"
            aria-controls="basic-navbar-nav"
          />
          <SearchModal show={modalShow} onHide={() => setModalShow(false)} />

          <Navbar.Brand className="m-0 p-3 p-md-0">
            <Link className="navbar-link p-2" to="/home">
              <picture>
                <source media="(max-width: 768px)" srcSet={smallLogo} />
                <source media="(min-width: 769px)" srcSet={bigLogo} />
                <img
                  // width="220px"
                  className="logo-img"
                  src={smallLogo}
                  alt="logo"
                />
              </picture>
              {/* <img width="220px" className="logo-img" src={logo} alt="logo" /> */}
            </Link>
          </Navbar.Brand>

          <button
            className="search-icon-btn ms-auto me-md-auto ms-md-0"
            onClick={() => handleSearchClick()}
          >
            <SearchIcon onClick={(prev) => setModalShow(!prev)} />
          </button>

          <span></span>
          <Navbar.Collapse
            className="navbar-collapse-box"
            id="responsive-navbar-nav"
          >
            <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Navbar.Collapse>
          <span></span>
        </div>
      </Navbar>
      <SectionNav />
    </header>
  );
};

export default Header;
