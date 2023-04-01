import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import './SectionNav.scss'

function SectionNav() {
  const renderSections = () =>
    ['planets', 'characters', 'starships'].map((section) => (
      <NavLink
        key={section}
        className="section-nav__link section-nav__link--border-silver"
        to={section}
      >
        {({ isActive }) => (
          <>
            <div
              className={isActive ? 'section-nav__link--light-saber ' : null}
            />
            <span>{section.toUpperCase()}</span>
          </>
        )}
      </NavLink>
    ))
  return (
    <nav className="section-nav">
      <div className="section-nav__container">{renderSections()}</div>
    </nav>
  )
}

export default memo(SectionNav)
