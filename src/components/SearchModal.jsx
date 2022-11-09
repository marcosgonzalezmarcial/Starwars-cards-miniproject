import { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchModal = ({ show, onHide }) => {
  // const [searchTerm, setSearchTerm] = useState(null)
  const [searchCategory, setSearchCategory] = useState(null)

  let navigate = useNavigate()

  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/${searchCategory}/?search=${inputRef.current.value}`)
    inputRef.current.value = ''
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
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <fieldset>
              <legend style={{ fontSize: '1rem' }}>Select a category</legend>
              <Form.Check
                onChange={handleSelection}
                inline
                name="radio-stacked"
                type="radio"
                label="Planets"
                role="switch"
                required
                data-type="planets"
              />
              <Form.Check
                onChange={handleSelection}
                inline
                name="radio-stacked"
                type="radio"
                label="Characters"
                role="switch"
                required
                data-type="characters"
              />
              <Form.Check
                onChange={handleSelection}
                inline
                name="radio-stacked"
                type="radio"
                role="switch"
                label="Starships"
                required
                data-type="starships"
              />
            </fieldset>
          </Form.Group>
          <Form.Group className="mt-2" controlId="form.Name">
            {/* <Form.Label>Search term</Form.Label> */}
            <Form.Control
              ref={inputRef}
              name="searchInput"
              type="text"
              placeholder="Enter search term"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" /*onClick={onHide}*/>Search</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default SearchModal
