import { useRef } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import './SearchForm.scss'

export default function SearchForm({ handleClose }) {
  let navigate = useNavigate()

  const inputRef = useRef(null)
  const inputRadioRef = useRef(null)

  const handleSelection = (e) => {
    inputRadioRef.current = e.target.getAttribute('data-type')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
    navigate({
      pathname: 'search',
      search: `?${createSearchParams([
        ['category', inputRadioRef.current],
        ['searchTerm', inputRef.current.value]
      ])}`
    })
  }

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
                  required
                  data-type="planets"
                  type="radio"
                  ref={inputRadioRef}
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
                  required
                  data-type="characters"
                  type="radio"
                  ref={inputRadioRef}
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
                  required
                  data-type="starships"
                  type="radio"
                  ref={inputRadioRef}
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
          required
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
