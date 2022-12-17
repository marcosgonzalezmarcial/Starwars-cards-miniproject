import burgerBtn from "../../assets/icons/hamburger-menu-btn.svg";
import "./toggle-btn.scss";
const ToggleMenuBtn = ({ setToggleMenu, toggleMenu }) => {
  const handleToggle = () => setToggleMenu(!toggleMenu);
  return (
    <button onClick={handleToggle} className="navbar-toggle-btn-NEW me-auto">
      <img src={burgerBtn} alt="burger button" />
    </button>
  );
};

export default ToggleMenuBtn;
