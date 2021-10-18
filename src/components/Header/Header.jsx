import React from "react";
import { Navbar, Nav, Col, Row } from "react-bootstrap";
import logo from "../../assets/star-wars-logo.jpg";
import LoginNav from "../../pages/Login/LoginNav";
import "./header.css";
import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";

const Header = ({ setShowCard, loggedIn, setLoggedIn }) => {
  return (
    <header>
      <div className="px-3">
        <Row className="px-1">
          <Col
            sm={12}
            className="d-flex justify-content-center gx-0 col-logo bg-col-logo"
          >
            <Nav>
              <Navbar.Brand className=" navbar-link p-2">
                <Link className=" navbar-link p-2" to="/home">
                  <img width="220px" src={logo} alt="logo" />
                </Link>
              </Navbar.Brand>
              <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Nav>
          </Col>
        </Row>
        <Row className="justify-content-center border-top border-bottom border-secondary">
          <MyNavbar setShowCard={setShowCard} />
        </Row>
      </div>
    </header>
  );
};

export default Header;
