import {
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  Button
} from 'react-bootstrap'

export const OffCanvas = () => {
  let expand = 'md'
  return (
    <>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
      <Navbar.Offcanvas
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
      </Navbar.Offcanvas>
    </>
  )
}
