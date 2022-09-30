import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
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

  const conditionalNav = loggedIn ? (
    <Link onClick={handleClick} to="/home" className="nav-link login-nav-link">
      LOG OUT
    </Link>
  ) : (
    <>
      <Link className="login-nav-link navbar-link p-1" to="/loginform">
        LOG IN
      </Link>
      <div className="login-nav-link p-1">&#8725; &#8725;</div>
      <Link className="login-nav-link navbar-link p-1" to="/signupform">
        SIGN UP
      </Link>
    </>
  );

  return (
    <header className="header">
      <Navbar className="navbar-box py-3 px-1" expand="md">
        <Container
          fluid
          className="navbar-container-box text-center position-relative justify-content-end"
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
          ></Navbar.Collapse> */}
          <Nav>{conditionalNav}</Nav>
        </Container>
      </Navbar>
      <MyNavbar setShowCard={setShowCard} />
    </header>
  );
};

export default Header;

// <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//   <Container>
//     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//     <Navbar.Collapse id="responsive-navbar-nav">
//       <Nav className="me-auto">
//         <Nav.Link href="#features">Features</Nav.Link>
//         <Nav.Link href="#pricing">Pricing</Nav.Link>
//         <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.2">
//             Another action
//           </NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item href="#action/3.4">
//             Separated link
//           </NavDropdown.Item>
//         </NavDropdown>
//       </Nav>
//       <Nav>
//         <Nav.Link href="#deets">More deets</Nav.Link>
//         <Nav.Link eventKey={2} href="#memes">
//           Dank memes
//         </Nav.Link>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>
