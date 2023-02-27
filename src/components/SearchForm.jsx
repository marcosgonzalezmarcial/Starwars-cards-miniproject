import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TYPE_OF_DATA } from 'constants.js'
import './SearchForm.scss'
import '../pages/RegisterForm.scss'

const SearchForm = ({ handleClose }) => {
  const [searchCategory, setSearchCategory] = useState(null)

  let navigate = useNavigate()

  const inputRef = useRef(null)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      navigate(`/${searchCategory}/?search=${inputRef.current.value}`)
      handleClose()
    },
    [navigate, handleClose, searchCategory]
  )

  const handleSelection = useCallback((e) => {
    if (e.target.getAttribute('data-type') === TYPE_OF_DATA.PEOPLE) {
      setSearchCategory('characters')
    } else {
      setSearchCategory(e.target.getAttribute('data-type'))
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="search-form">
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
                  required="true"
                  data-type="planets"
                  type="radio"
                  className="search-form__check-input"
                  onChange={handleSelection}
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
                  required="true"
                  data-type="people"
                  type="radio"
                  onChange={handleSelection}
                  className="search-form__check-input"
                />
              </div>
              Characters
            </label>
            <label className="search-form__label">
              <div className="search-form__radio-input-wrapper">
                <input
                  onChange={handleSelection}
                  name="radio-stacked"
                  role="switch"
                  aria-checked="false"
                  required="true"
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
          name="searchInput"
          placeholder="Enter search term after selecting the type"
          required="true"
          type="text"
          id="form.Name"
          className="search-form__input-field"
          ref={inputRef}
        />
      </div>
      <div className="modal-section-wrapper">
        <button className="search-modal__submit-btn" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
