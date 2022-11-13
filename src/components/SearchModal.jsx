import { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchModal = ({ show, onHide }) => {
  const [searchCategory, setSearchCategory] = useState(null)

  let navigate = useNavigate()

  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/${searchCategory}/?search=${inputRef.current.value}`)
    onHide()
  }

  const handleSelection = (e) => {
    setSearchCategory(e.target.getAttribute('data-type'))
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal"
    >
      <Form className="modal-form" onSubmit={handleSubmit}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title
            className="custom-modal-title"
            id="contained-modal-title-vcenter"
          >
            Search
          </Modal.Title>
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
                  data-type="planets"
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
                  data-type="characters"
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
                  data-type="starships"
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
              placeholder="Enter search term"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="modal-search-btn">
            Search
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default SearchModal
