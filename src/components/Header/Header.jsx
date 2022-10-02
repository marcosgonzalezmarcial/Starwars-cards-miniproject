import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../../assets/star-wars-logo.jpg'
// import LoginNav from "../../pages/Login/LoginNav";
import './header.css'
import { Link } from 'react-router-dom'
import MyNavbar from './MyNavbar'

const Header = ({ setShowCard, loggedIn, setLoggedIn }) => {
  const handleClick = () => {
    setLoggedIn(false)
  }

  const conditionalNav = loggedIn ? (
    <Nav>
      <span></span>
      <Link
        onClick={handleClick}
        to="/home"
        className="nav-link login-nav-link"
      >
        LOG OUT
      </Link>
      <span></span>
    </Nav>
  ) : (
    <Nav>
      <Link className="login-nav-link navbar-link p-1" to="/loginform">
        LOG IN
      </Link>
      <div className="login-nav-link p-1">&#8725; &#8725;</div>
      <Link className="login-nav-link navbar-link p-1" to="/signupform">
        SIGN UP
      </Link>
    </Nav>
  )

  return (
    <header className="header">
      <Navbar className="navbar-box py-1 py-md-3" expand="md">
        <Container
          fluid
          className="navbar-container-box text-center position-relative justify-content-end"
          bg="transparent"
        >
          <span></span>
          <Navbar.Brand className=" m-0">
            <Link className="navbar-link p-2" to="/home">
              <img width="220px" className='logo-img' src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            className="navbar-toggle-btn bg-light ms-auto"
            aria-controls="basic-navbar-nav"
          />
          <span></span>
          <Navbar.Collapse id="responsive-navbar-nav">
            {conditionalNav}
          </Navbar.Collapse>
          <span></span>
        </Container>
      </Navbar>
      <MyNavbar setShowCard={setShowCard} />
    </header>
  )
}

export default Header


