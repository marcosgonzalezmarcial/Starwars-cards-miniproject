import { memo } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./SectionNav.scss";

const SectionNav = () => {
  console.log("SectionNav render");
  const renderSections = () =>
    ["planets", "characters", "starships"].map((section) => (
      <NavLink
        key={section}
        className="section-nav__link col py-0 section-nav__link--border-silver"
        to={section}
      >
        {({ isActive }) => (
          <div className="p-2">
            <div
              className={isActive ? "section-nav__link--light-saber " : null}
            />
            <span>{section.toUpperCase()}</span>
          </div>
        )}
      </NavLink>
    ));
  return (
    <nav className="section-nav">
      <div className="section-nav__container">{renderSections()}</div>
    </nav>
  );
};

export default memo(SectionNav);
