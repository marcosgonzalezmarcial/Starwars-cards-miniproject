import burgerBtn from '../../../assets/icons/hamburger-menu-btn.svg'
import './ToggleLoginMenuBtn.scss'
import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'

const ToggleLoginMenuBtn = () => {
  const { toggle: handleToggleMenu } = useLoginMenuCtx()

  return (
    <button onClick={handleToggleMenu} className="toggle-login-menu-btn">
      <img src={burgerBtn} alt="burger button" />
    </button>
  )
}

export default ToggleLoginMenuBtn
