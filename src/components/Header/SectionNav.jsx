import { Col, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

const SectionNav = () => {
  let activeClassName = 'light-saber'
  return (
    <div className="border-wrapper">
      <div className="m-auto nav-wrapper">
        <Nav className="p-0 justify-content-center">
          <Col className="border-silver">
            <Nav.Item>
              {/* <Link className="nav-link px-2 text-center" to="/planets">
                PLANETS
              </Link> */}

              <NavLink className="nav-link text-center py-1" to="planets">
                {({ isActive }) => (
                  <>
                    <div className="h-100 w-100 py-1 position-realitive">
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
              {/* <Link className="nav-link px-2 text-center" to="/starships">
                STARSHIPS
              </Link> */}
              <NavLink className="nav-link text-center py-1" to="starships">
                {({ isActive }) => (
                  <>
                    <div className="h-100 w-100 py-1 position-realitive">
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
              {/* <Link className="nav-link px-2 text-center" to="/characters">
                CHARACTERS
              </Link> */}
              <NavLink className="nav-link text-center py-1" to="characters">
                {({ isActive }) => (
                  <>
                    <div className="h-100 w-100 py-1 position-realitive">
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
