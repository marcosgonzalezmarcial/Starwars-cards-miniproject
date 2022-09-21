import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from '../../assets/star-wars-logo.jpg'
import LoginNav from '../../pages/Login/LoginNav'
import './header.css'
import { Link } from 'react-router-dom'
import MyNavbar from './MyNavbar'

const Header = ({ setShowCard, loggedIn, setLoggedIn }) => {
  return (
    <header className="header">
      <Nav className="d-flex p-3 justify-content-center">
        <Navbar.Brand className="m-0">
          <Link className="navbar-link p-2" to="/home">
            <img width="220px" src={logo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </Nav>
      <MyNavbar setShowCard={setShowCard} />
    </header>
  )
}

export default Header
