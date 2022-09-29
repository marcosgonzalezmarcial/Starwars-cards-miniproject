import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/star-wars-logo.jpg";
// import LoginNav from "../../pages/Login/LoginNav";
import "./header.css";
import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";
// import { LinkContainer } from "react-router-bootstrap";

const Header = ({ setShowCard, loggedIn, setLoggedIn }) => {
  const handleClick = () => {
    setLoggedIn(false);
  };
  const conditionalNav = (
    <Nav>
      {loggedIn ? (
        <Link
          onClick={handleClick}
          to="/home"
          className="nav-link login-nav-link"
        >
          LOG OUT
        </Link>
      ) : (
        <>
          <Link className="login-nav-link navbar-link p-1" to="/loginform">
            LOG IN
          </Link>
          <div className="login-nav-link p-1">//</div>
          <Link className="login-nav-link navbar-link p-1" to="/signupform">
            SIGN UP
          </Link>
        </>
      )}
    </Nav>
  );

  return (
    <header className="header">
      <Navbar className="navbar-box" expand="md">
        <Container
          fluid
          className="navbar-container-box position-relative justify-content-end"
          bg="transparent"
        >
          <Navbar.Brand className="navbar-brand-box m-0">
            <Link className="navbar-link p-2" to="/home">
              <img width="220px" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          {/* <Navbar.Toggle
            className="bg-light ms-auto"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse
            className="flex-grow-0 text-center"
            id="basic-navbar-nav"
          >
          </Navbar.Collapse> */}
          {conditionalNav}
        </Container>
      </Navbar>
      <MyNavbar setShowCard={setShowCard} />
    </header>
  );
};

export default Header;
