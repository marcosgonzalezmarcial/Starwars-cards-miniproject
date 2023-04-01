// import burgerBtn from '../../../assets/icons/hamburger-menu-btn.svg'
import './ToggleLoginMenuBtn.scss'
import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'
import { ReactComponent as ToggleIcon } from '../../../assets/icons/hamburger-menu-btn.svg'


export default function ToggleLoginMenuBtn() {
  const { toggle } = useLoginMenuCtx()

  return (
    <button onClick={toggle} className="toggle-login-menu-btn">
      {/* <img src={burgerBtn} alt="burger button" /> */}
      <ToggleIcon className="toggle-login-menu-svg" />
    </button>
  )
}
