import { useContext } from "react";
import burgerBtn from "../../../assets/icons/hamburger-menu-btn.svg";
import "./toggle-btn.scss";
import { UiContext } from "contexts/UiContext";

const ToggleMenuBtn = () => {
  const { handleToggle } = useContext(UiContext);
  return (
    <button onClick={handleToggle} className="navbar-toggle-btn me-auto">
      <img src={burgerBtn} alt="burger button" />
    </button>
  );
};

export default ToggleMenuBtn;
