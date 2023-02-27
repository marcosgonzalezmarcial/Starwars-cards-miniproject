import { useCallback, useState } from "react";
import "./SearchIcon.scss";
import searchIconSvg from "assets/icons/search-icon.svg";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal";
import SearchForm from "components/SearchForm";

const SearchButton = ({ loggedIn }) => {
  const [showModal, setShowModal] = useState(false);

  let navigate = useNavigate();

  function handleSearchClick() {
    if (!loggedIn) return navigate("/login");
    setShowModal(true);
  }

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <button className="search-icon-btn" onClick={handleSearchClick}>
        <img src={searchIconSvg} alt="search icon" />
      </button>
      {showModal && (
        <Modal handleClose={handleClose}>
          <SearchForm handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
};

export default SearchButton;
