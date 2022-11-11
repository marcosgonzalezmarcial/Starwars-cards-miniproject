import React, { useState } from 'react'
import {
	Navbar,
	Container,
	// Modal,
	// Offcanvas,
	// NavDropdown,
	// Nav,
	Button,
} from 'react-bootstrap'
import logo from '../../assets/sw_logo_mobile.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import SectionNav from './SectionNav'
import LoginNav from './LoginNav'
import SearchIcon from '../SearchIcon'
import SearchModal from '../SearchModal'

const Header = ({ loggedIn, setLoggedIn }) => {
	const [modalShow, setModalShow] = useState(false)
	let navigate = useNavigate()

	const handleSearchClick = () => {
		if (loggedIn) {
			setModalShow(true)
		} else {
			navigate('/loginform')
		}
	}
	return (
		<header className="header">
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

					<div className="ms-auto me-md-auto ms-md-0 search-icon-container">
						<Button
							// as="div"
							className="search-icon-btn"
							// variant="dark"
							onClick={() => handleSearchClick()}
						>
							<SearchIcon onClick={prev => setModalShow(!prev)} />
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
	)
}

export default Header
