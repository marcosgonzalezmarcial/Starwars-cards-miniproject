import { useCallback, useRef, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TYPE_OF_DATA } from '../../constants'
import './SearchModal.scss'
import { useSearchModal } from 'hooks/useSearchModal'

const SearchModal = () => {
  const [searchCategory, setSearchCategory] = useState(null)

  const {
    isToggledSearchModal: showModal,
    toggleSearchModal: handleToggleModal
  } = useSearchModal()

  let navigate = useNavigate()

  const inputRef = useRef(null)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      navigate(`/${searchCategory}/?search=${inputRef.current.value}`)
      handleToggleModal()
    },
    [handleToggleModal, navigate, searchCategory]
  )

  const handleSelection = useCallback((e) => {
    if (e.target.getAttribute('data-type') === TYPE_OF_DATA.PEOPLE) {
      setSearchCategory('characters')
    } else {
      setSearchCategory(e.target.getAttribute('data-type'))
    }
  }, [])

  return (
    <Modal
      show={showModal}
      onHide={handleToggleModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="search-modal"
    >
      <Form className="search-modal__form" onSubmit={handleSubmit}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <fieldset>
              <Form.Label>
                <Form.Check
                  onChange={handleSelection}
                  inline
                  name="radio-stacked"
                  type="radio"
                  role="switch"
                  required
                  data-type={`${TYPE_OF_DATA.PLANETS}`}
                />
                Planets
              </Form.Label>
              <Form.Label>
                <Form.Check
                  onChange={handleSelection}
                  inline
                  name="radio-stacked"
                  type="radio"
                  role="switch"
                  required
                  data-type={`${TYPE_OF_DATA.PEOPLE}`}
                />
                Characters
              </Form.Label>
              <Form.Label>
                <Form.Check
                  onChange={handleSelection}
                  inline
                  name="radio-stacked"
                  type="radio"
                  role="switch"
                  required
                  data-type={`${TYPE_OF_DATA.STARSHIPS}`}
                />
                Starships
              </Form.Label>
            </fieldset>
          </Form.Group>
          <Form.Group className="mt-2" controlId="form.Name">
            <Form.Control
              ref={inputRef}
              name="searchInput"
              type="text"
              placeholder="Enter search term after selecting the type"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="search-modal__submit-btn">
            Search
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default SearchModal
