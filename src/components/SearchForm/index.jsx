import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./SearchForm.scss";

export default function SearchForm({ handleClose }) {
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  let navigate = useNavigate();

  // regex to validate search term no special characters but -
  const inputValidationRegex = /^[a-zA-Z0-9-]*$/;
  const validateSearchTerm = ({ searchTerm }) =>
    inputValidationRegex.test(searchTerm);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSearchTermChange = (event) => {
    setInputValue(event.target.value);
    const isValidSearchTerm = validateSearchTerm({
      searchTerm: event.target.value.trim(),
    });
    if (isValidSearchTerm === false) {
      setError("Please enter search term without special characters");
    } else {
      setSearchTerm(event.target.value.trim());
      setError(null);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm) {
      handleClose();
      navigate({
        pathname: "search",
        search: `?${createSearchParams([
          ["category", selectedOption],
          ["searchTerm", searchTerm],
        ])}`,
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <h1 className="search-form__title">Search</h1>
      <div className="modal-section-wrapper">
        <div className="search-form__fieldset-wrapper">
          <fieldset>
            <label className="search-form__label">
              <div className="search-form__radio-input-wrapper">
                <input
                  name="radio-stacked"
                  role="switch"
                  aria-checked="false"
                  required
                  data-type="planets"
                  type="radio"
                  className="search-form__check-input"
                  value={"planets"}
                  checked={selectedOption === "planets"}
                  onChange={handleOptionChange}
                />
              </div>
              Planets
            </label>
            <label className="search-form__label">
              <div className="search-form__radio-input-wrapper">
                <input
                  name="radio-stacked"
                  role="switch"
                  aria-checked="false"
                  required
                  data-type="characters"
                  type="radio"
                  onChange={handleOptionChange}
                  className="search-form__check-input"
                  value={"characters"}
                  checked={selectedOption === "characters"}
                />
              </div>
              Characters
            </label>
            <label className="search-form__label">
              <div className="search-form__radio-input-wrapper">
                <input
                  onChange={handleOptionChange}
                  value={"starships"}
                  checked={selectedOption === "starships"}
                  name="radio-stacked"
                  role="switch"
                  aria-checked="false"
                  required
                  data-type="starships"
                  type="radio"
                  className="search-form__check-input"
                />
              </div>
              Starships
            </label>
          </fieldset>
        </div>

        <input
          name="searchTerm"
          placeholder="Enter search term after selecting the type"
          required
          type="text"
          id="form.Name"
          className="search-form__input-field"
          value={inputValue}
          onChange={handleSearchTermChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="modal-section-wrapper">
        <button
          disabled={searchTerm ? false : true}
          className="search-modal__submit-btn"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}
