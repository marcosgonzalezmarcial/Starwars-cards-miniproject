import { useRef, useState, useContext } from "react";
import { Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TYPE_OF_DATA } from "../../constants";
import "./SearchModal.scss";
import { UiContext } from "contexts/UiContext";

const SearchModal = () => {
  const [searchCategory, setSearchCategory] = useState(null);
  const { showModal, handleToggleModal } = useContext(UiContext);

  let navigate = useNavigate();

  console.log("SearchModal renders because of useNavigate");

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${searchCategory}/?search=${inputRef.current.value}`);
    handleToggleModal();
  };

  const handleSelection = (e) => {
    if (e.target.getAttribute("data-type") === TYPE_OF_DATA.PEOPLE) {
      setSearchCategory("characters");
    } else {
      setSearchCategory(e.target.getAttribute("data-type"));
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleToggleModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="search-modal"
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
  );
};

export default SearchModal;
