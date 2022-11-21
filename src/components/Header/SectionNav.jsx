import { Col, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const SectionNav = () => {
  let activeClassName = 'active-link-light-saber'
  return (
    <div className="border-wrapper">
      <div className="m-auto nav-wrapper">
        <Nav className="py-0 px-4 justify-content-center">
          <Col className="border-silver">
            <Nav.Item>
              <NavLink className="nav-link text-center py-1" to="planets">
                {({ isActive }) => (
                  <>
                    <div className="py-1 position-realitive">
                      <div
                        className={isActive ? activeClassName : undefined}
                      ></div>
                      <span>PLANETS</span>
                    </div>
                  </>
                )}
              </NavLink>
            </Nav.Item>
          </Col>
          <Col className="border-silver">
            <Nav.Item>
              <NavLink className="nav-link text-center py-1" to="starships">
                {({ isActive }) => (
                  <>
                    <div className="py-1 position-realitive">
                      <div
                        className={isActive ? activeClassName : undefined}
                      ></div>
                      <span>STARSHIPS</span>
                    </div>
                  </>
                )}
              </NavLink>
            </Nav.Item>
          </Col>
          <Col className="border-silver">
            <Nav.Item>
              <NavLink className="nav-link text-center py-1 " to="characters">
                {({ isActive }) => (
                  <>
                    <div className="py-1 position-realitive">
                      <div
                        className={isActive ? activeClassName : undefined}
                      ></div>
                      <span>CHARACTERS</span>
                    </div>
                  </>
                )}
              </NavLink>
            </Nav.Item>
          </Col>
        </Nav>
      </div>
    </div>
  )
}

export default SectionNav
