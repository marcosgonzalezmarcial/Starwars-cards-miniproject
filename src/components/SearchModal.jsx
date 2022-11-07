import { Button, Form, Modal } from "react-bootstrap";

const SearchModal = (props) => {
  return (
    <Modal
      {...props}
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
            <Form.Control type="text" placeholder="Enter search term" />
          </Form.Group>
        </Form>
        {/* </Container> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
