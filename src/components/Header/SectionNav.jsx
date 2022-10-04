import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = ({ setShowCard }) => {
  const handleClickStarships = () => {
    setShowCard(false);
  };
  const handleClickPeople = () => {
    setShowCard(false);
  };
  return (
    <div className="border-wrapper">
      <Container>
        <Row className="m-auto">
          <Nav className="justify-content-center">
            <Col className="border-right">
              <Nav.Item>
                <Link className="nav-link px-2 text-center" to="/home">
                  HOME
                </Link>
              </Nav.Item>
            </Col>
            <Col className="border-right">
              <Nav.Item>
                <Link
                  onClick={handleClickStarships}
                  className="nav-link px-2 text-center"
                  to="/starships"
                >
                  STARSHIPS
                </Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Link
                  onClick={handleClickPeople}
                  className="nav-link px-2 text-center"
                  to="/people"
                >
                  PEOPLE
                </Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
      </Container>
    </div>
  );
};

export default MyNavbar;
