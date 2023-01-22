import { useCallback, useContext } from "react";
import "./SearchIcon.scss";
import searchIconSvg from "assets/icons/search-icon.svg";
import { UiContext } from "contexts/UiContext";
// import { useNavigate } from "react-router-dom";

const SearchButton = ({ loggedIn }) => {
  const { handleToggleModal } = useContext(UiContext);

  // let navigate = useNavigate();

  console.log("SearchButton render");

  const handleSearchClick = useCallback(() => {
    // if (!loggedIn) return navigate("/login");
    // if (!loggedIn) return alert("You must log in before searching");
    handleToggleModal();
  }, [loggedIn /*navigate*/]);

  return (
    <button
      className="search-icon-btn ms-auto me-md-auto ms-md-0"
      onClick={handleSearchClick}
    >
      <img src={searchIconSvg} alt="search icon" />
    </button>
  );
};

export default SearchButton;
