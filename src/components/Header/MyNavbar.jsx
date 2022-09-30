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
    <>
      {/* <Nav className="justify-content-center border-top border-bottom border-secondary d-flex">
        <Nav.Item className="border border-secondary flex-grow-1">
          <Link className="nav-link px-2 text-center" to="/home">
            HOME
          </Link>
        </Nav.Item>
        <Nav.Item className="border border-secondary flex-grow-1">
          <Link
            onClick={handleClickStarships}
            className="nav-link px-2 text-center"
            to="/starships"
          >
            STARSHIPS
          </Link>
        </Nav.Item>
        <Nav.Item className="border border-secondary flex-grow-1">
          <Link
            onClick={handleClickPeople}
            className="nav-link px-2 text-center"
            to="/people"
          >
            PEOPLE
          </Link>
        </Nav.Item>
      </Nav> */}
      <Container fluid>
        <Row style={{ maxWidth: "1100px" }} className="m-auto">
          <Nav className="justify-content-center border-top border-bottom border-secondary">
            <Col>
              <Nav.Item className="border border-secondary">
                <Link className="nav-link px-2 text-center" to="/home">
                  HOME
                </Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item className="border border-secondary">
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
              <Nav.Item className="border border-secondary">
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
    </>
  );
};

export default MyNavbar;
