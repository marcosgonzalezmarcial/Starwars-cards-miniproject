import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/sw_logo_mobile.png";
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
      <Navbar variant="dark" className="navbar-box py-1 py-md-3" expand="md">
        <div className="navbar-container-box text-center position-relative justify-content-end px-0">
          <Navbar.Toggle
            className="navbar-toggle-btn me-auto"
            aria-controls="basic-navbar-nav"
          />
          <SearchModal show={modalShow} onHide={() => setModalShow(false)} />

          <Navbar.Brand className="m-0 p-3">
            <Link className="navbar-link p-2" to="/home">
              <img width="220px" className="logo-img" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>

          <div className="ms-auto me-md-auto ms-md-0 search-icon-container">
            <Button
              // as="div"
              className="search-icon-btn"
              onClick={() => handleSearchClick()}
            >
              <SearchIcon onClick={(prev) => setModalShow(!prev)} />
            </Button>
          </div>

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
