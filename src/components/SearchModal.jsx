import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const SearchModal = ({ show, onHide }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const inputRef = useRef(null);
  const handleChange = (e) => {
    inputRef.current.value = e.target.value;
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Container> */}
        <Form>
          <Form.Group controlId="form.Name">
            {/* <Form.Label>Search term</Form.Label> */}
            <Form.Control
              onChange={handleChange}
              ref={inputRef}
              // value={inputRef}
              type="text"
              placeholder="Enter search term"
            />
          </Form.Group>
        </Form>
        {/* </Container> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
