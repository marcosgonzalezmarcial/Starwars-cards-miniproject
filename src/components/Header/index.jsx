import React, { useState } from "react";
import {
  Navbar,
  Container,
  Modal,
  Offcanvas,
  NavDropdown,
  Nav,
  Button
} from "react-bootstrap";
import logo from "../../assets/sw_logo_mobile.png";
import "./Header.css";
import { Link } from "react-router-dom";
import SectionNav from "./SectionNav";
import LoginNav from "./LoginNav";
import SearchIcon from "../SearchIcon";
import SearchModal from "../SearchModal";

const Header = ({ loggedIn, setLoggedIn }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <header className="header">
      {/* <Sidebar /> */}
      <Navbar variant="dark" className="navbar-box py-1 py-md-3" expand="md">
        <Container
          fluid
          className="navbar-container-box text-center position-relative justify-content-end px-0"
        >
          <Navbar.Toggle
            className="navbar-toggle-btn me-auto"
            aria-controls="basic-navbar-nav"
          />
          <SearchModal show={modalShow} onHide={() => setModalShow(false)} />

          {/* <Navbar.Toggle
            className="navbar-toggle-btn me-auto"
            aria-controls={`offcanvasNavbar-expand-md`}
          /> */}

          <Navbar.Brand className="m-0 p-3">
            <Link className="navbar-link p-2" to="/home">
              <img width="220px" className="logo-img" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          {/* <div className="ms-auto d-md-none search-icon-container">
            <SearchIcon onClick={() => setModalShow(true)} />
          </div> */}
          <div className="ms-auto d-md-none search-icon-container">
            <Button variant="dark" onClick={() => setModalShow(true)}>
              {/* <div className="ms-auto d-md-none search-icon-container"> */}
              <SearchIcon onClick={() => setModalShow(true)} />
            </Button>
          </div>

          <span></span>
          <Navbar.Collapse
            className="navbar-collapse-box"
            id="responsive-navbar-nav"
          >
            <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Navbar.Collapse>
          {/* <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas> */}
          <span></span>
        </Container>
      </Navbar>
      <SectionNav />
    </header>
  );
};

export default Header;

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
