import { useCallback } from "react";
import "./SearchIcon.scss";
import searchIconSvg from "assets/icons/search-icon.svg";
import { useNavigate } from "react-router-dom";
import { useSearchModal } from "hooks/useSearchModal";

const SearchButton = ({ loggedIn }) => {
  const { toggleSearchModal } = useSearchModal();
  console.log("SearchButton renders because useNavigate");

  let navigate = useNavigate();

  const handleSearchClick = useCallback(() => {
    if (!loggedIn) return navigate("/login");
    toggleSearchModal();
  }, [loggedIn, toggleSearchModal, navigate]);

  return (
    <button className="search-icon-btn" onClick={handleSearchClick}>
      <img src={searchIconSvg} alt="search icon" />
    </button>
  );
};

export default SearchButton;
