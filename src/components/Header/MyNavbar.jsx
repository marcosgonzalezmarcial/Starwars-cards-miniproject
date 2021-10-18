import React from "react";
import { Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = ({ setShowCard }) => {
  const handleClickStarships = () => {
    setShowCard(false);
  };
  const handleClickPeople = () => {
    setShowCard(false);
  };
  return (
    <Col className="gx-0">
      <Nav className="nav justify-content-center">
        <Nav.Item className="border border-secondary">
          <Link className="nav-link" to="/home">
            HOME
          </Link>
        </Nav.Item>
        <Nav.Item className="border border-secondary">
          <Link
            onClick={handleClickStarships}
            className="nav-link"
            to="/starships"
          >
            STARSHIPS
          </Link>
        </Nav.Item>
        <Nav.Item className="border border-secondary">
          <Link onClick={handleClickPeople} className="nav-link" to="/people">
            PEOPLE
          </Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default MyNavbar;
