import burgerBtn from "../../../assets/icons/hamburger-menu-btn.svg";
import "./ToggleLoginMenuBtn.scss";

import { useLoginMenuCtx } from "contexts/LoginMenuCtx";

const TogglLoginMenuBtn = () => {
  const [, handleToggleMenu] = useLoginMenuCtx();

  console.log("ToggleMenuBtn render");

  return (
    <button onClick={handleToggleMenu} className="toggle-login-menu-btn">
      <img src={burgerBtn} alt="burger button" />
    </button>
  );
};

export default TogglLoginMenuBtn;
