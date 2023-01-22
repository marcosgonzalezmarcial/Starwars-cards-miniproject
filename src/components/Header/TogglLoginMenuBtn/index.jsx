import { useContext, memo } from "react";
import burgerBtn from "../../../assets/icons/hamburger-menu-btn.svg";
import "./toggle-btn.scss";
import { UiContext } from "contexts/UiContext";

const TogglLoginMenuBtn = () => {
  const { handleToggleMenu } = useContext(UiContext);

  console.log("ToggleMenuBtn render");

  return (
    <button onClick={handleToggleMenu} className="navbar-toggle-btn me-auto">
      <img src={burgerBtn} alt="burger button" />
    </button>
  );
};

export default TogglLoginMenuBtn;
