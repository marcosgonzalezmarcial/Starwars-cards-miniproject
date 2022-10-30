import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
// import logo from '../../assets/star-wars-logo.jpg'
import logo from '../../assets/sw_logo_mobile.png'
import './Header.css'
import { Link } from 'react-router-dom'
import SectionNav from './SectionNav'
import LoginNav from './LoginNav'

const Header = ({ loggedIn, setLoggedIn }) => {
	return (
		<header className="header">
			<Navbar className="navbar-box py-1 py-md-3" expand="md">
				<Container
					fluid
					className="navbar-container-box text-center position-relative justify-content-end px-0"
				>
					<span></span>
					<Navbar.Brand className="m-0 p-3">
						<Link className="navbar-link p-2" to="/home">
							<img width="220px" className="logo-img" src={logo} alt="logo" />
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle
						className="navbar-toggle-btn bg-light ms-auto"
						aria-controls="basic-navbar-nav"
					/>
					<span></span>
					<Navbar.Collapse
						className="navbar-collapse-box"
						id="responsive-navbar-nav"
					>
						<LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
					</Navbar.Collapse>
					<span></span>
				</Container>
			</Navbar>
			<SectionNav />
		</header>
	)
}

export default Header
