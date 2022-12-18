import { useContext } from "react";
import burgerBtn from "../../../assets/icons/hamburger-menu-btn.svg";
import "./toggle-btn.scss";
import { uiContext } from "../../../contexts/uiContext";

const ToggleMenuBtn = () => {
  const { handleToggle } = useContext(uiContext);
  return (
    <button onClick={handleToggle} className="navbar-toggle-btn-NEW me-auto">
      <img src={burgerBtn} alt="burger button" />
    </button>
  );
};

export default ToggleMenuBtn;
