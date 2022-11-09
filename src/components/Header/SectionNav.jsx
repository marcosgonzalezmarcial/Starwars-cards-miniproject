import { Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SectionNav = () => {
  return (
    <div className="border-wrapper">
      <div className="m-auto nav-wrapper ">
        <Nav className="justify-content-center">
          <Col className="border-silver">
            <Nav.Item>
              <Link className="nav-link px-2 text-center" to="/planets">
                PLANETS
              </Link>
            </Nav.Item>
          </Col>
          <Col className="border-silver">
            <Nav.Item>
              <Link className="nav-link px-2 text-center" to="/starships">
                STARSHIPS
              </Link>
            </Nav.Item>
          </Col>
          <Col className="border-silver">
            <Nav.Item>
              <Link className="nav-link px-2 text-center" to="/characters">
                CHARACTERS
              </Link>
            </Nav.Item>
          </Col>
        </Nav>
      </div>
    </div>
  )
}

export default SectionNav
