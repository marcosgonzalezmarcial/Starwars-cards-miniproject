import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../../assets/star-wars-logo.jpg'
import LoginNav from '../../pages/Login/LoginNav'
import './header.css'
import { Link } from 'react-router-dom'
import MyNavbar from './MyNavbar'
import {LinkContainer} from 'react-router-bootstrap'

const Header = ({ setShowCard, loggedIn, setLoggedIn }) => {
  return (
    <header className="header">
      {/* <Nav className="d-flex p-3 justify-content-center">
        <Navbar.Brand className="m-0">
          <Link className="navbar-link p-2" to="/home">
            <img width="220px" src={logo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </Nav> */}
      <Navbar expand="md">
        <Container bg="transparent">
          <Navbar.Brand className="m-0">
            <Link className="navbar-link p-2" to="/home">
              <img width="220px" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='justify-content-end mb-2' id="basic-navbar-nav">
            <Nav className="text-center me-auto">
              {/* <Nav.Link className="login-nav-link">LOG IN</Nav.Link> */}
              <Link className="login-nav-link navbar-link p-1" to="/loginform">LOG IN</Link>
              <div className="login-nav-link p-1">//</div>
              <Link className="login-nav-link navbar-link p-1" to="/signupform">SIGN UP</Link>
              {/* <Nav.Link className="login-nav-link">SIGN UP</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
      <MyNavbar setShowCard={setShowCard} />
    </header>
  )
}

export default Header
