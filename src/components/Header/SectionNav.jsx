import { Col, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SectionNav = () => {
  return (
    <div className="border-wrapper">
      <Row className="m-auto w-50">
        <Nav className="justify-content-center">
          <Col className="border-silver">
            <Nav.Item>
              <Link className="nav-link px-2 text-center" to="/home">
                HOME
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
      </Row>
    </div>
  )
}

export default SectionNav
