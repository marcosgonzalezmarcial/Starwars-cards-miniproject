import burgerBtn from '../../../assets/icons/hamburger-menu-btn.svg'
import './ToggleLoginMenuBtn.scss'
import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'

export default function ToggleLoginMenuBtn() {
  const { toggle } = useLoginMenuCtx()

  return (
    <button onClick={toggle} className="toggle-login-menu-btn">
      <img src={burgerBtn} alt="burger button" />
    </button>
  )
}
