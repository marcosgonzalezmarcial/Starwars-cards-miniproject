import { Link } from 'react-router-dom'
import './SideBar.css'

export const Sidebar = () => {
  return (
    <nav className="sidebar-nav d-flex flex-column justify-content-center align-items-center">
      <Link className="nav-link px-2 text-center" to="/planets">
        PLANETS
      </Link>

      <Link className="nav-link px-2 text-center" to="/starships">
        STARSHIPS
      </Link>

      <Link className="nav-link px-2 text-center" to="/characters">
        CHARACTERS
      </Link>
    </nav>
  )
}
