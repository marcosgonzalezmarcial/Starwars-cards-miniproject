import { useCallback } from "react";
import { Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./SectionNav.scss";

const SectionNav = () => {



  const renderSections = useCallback(() => ["planets", "starships", "characters"].map(
    (section) => (
      <Col className="border-silver">
        <Nav.Item>
          <NavLink className="nav-link text-center py-1" to={section}>
            {({ isActive }) => (
              <>
                <div className="py-1 position-realitive">
                  <div
                    className={isActive ? "active-link-light-saber" : ""}
                  ></div>
                  <span>{section.toUpperCase()}</span>
                </div>
              </>
            )}
          </NavLink>
        </Nav.Item>
      </Col>
    )
  ), [])

  return (
    <div className="border-wrapper">
      <div className="m-auto nav-wrapper">
        <Nav className="py-0 px-4 justify-content-center">
          {renderSections()}
        </Nav>
      </div>
    </div>
  );
};

export default SectionNav;
