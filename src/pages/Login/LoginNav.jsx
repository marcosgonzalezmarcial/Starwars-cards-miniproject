/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginNav = ({ loggedIn, setLoggedIn }) => {
  const handleClick = () => {
    setLoggedIn(false)
  }

  return (
      <Container>
        <Row>
          <Navbar className="login-navbar flex-nowrap p-0 rounded-3" expand="md">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="button-toggler .bg-secondary"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
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
                    {' '}
                    <Link
                      to="/loginform"
                      className="d-block  nav-link login-nav-link"
                    >
                      LOG IN
                    </Link>
                    <p className="login-nav-link-bars align-self-center m-0 d-sm-none d-md-inline-block">
                      //
                    </p>
                    <Link
                      to="/signupform"
                      className="d-block nav-link login-nav-link"
                    >
                      SIGN UP
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
  )
}

export default LoginNav
