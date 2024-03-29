import smallLogo from 'assets/sw_logo_mobile.png'
import bigLogo from 'assets/star-wars-logo.jpg'
import { Link } from 'react-router-dom'
import SectionNav from 'components/Header/SectionNav'
import LoginNav from 'components/Header/LoginNav'
import ToggleLoginMenuBtn from 'components/Header/ToggleLoginMenuBtn'
import SearchButton from 'components/Header/SearchButton'
import './Header.scss'
import { LoginMenuCtxProvider } from 'contexts/LoginMenuCtx'

export default function Header() {
  return (
    <header className="main-header">
      <div className="main-header__container">
        <Link to="/">
          <picture>
            <source media="(max-width: 767px)" srcSet={smallLogo} />
            <source media="(min-width: 768px)" srcSet={bigLogo} />
            <img className="main-header__logo" src={smallLogo} alt="logo" />
          </picture>
        </Link>
        <SearchButton />
        <span></span>
        <LoginMenuCtxProvider>
          <ToggleLoginMenuBtn />
          <LoginNav />
        </LoginMenuCtxProvider>
        <span></span>
      </div>
      <SectionNav />
    </header>
  )
}
