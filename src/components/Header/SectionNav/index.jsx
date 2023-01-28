import { memo } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./SectionNav.scss";

const SectionNav = () => {
  console.log("SectionNav render");
  const renderSections = () =>
    ["planets", "characters", "starships"].map((section) => (
      <NavLink
        className="section-nav__link col py-0 section-nav__link--border-silver"
        to={section}
      >
        {({ isActive }) => (
          <div className="py-2">
            <div
              className={isActive ? "section-nav__link--light-saber" : null}
            ></div>
            <span>{section.toUpperCase()}</span>
          </div>
        )}
      </NavLink>
    ));
  return (
    <nav className="border-wrapper">
      <Nav className="px-4 section-nav">{renderSections()}</Nav>
    </nav>
  );
};

export default memo(SectionNav);
