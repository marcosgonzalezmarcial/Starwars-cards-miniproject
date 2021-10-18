import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import image from "../../assets/Darth-Vader.jpeg";
import PeopleFilms from "./PeopleFilms";
import PeopleShips from "./PeopleShips";
import "./character-card.css";

const CharacterCard = ({ people, peopleSelected }) => {
  const [person, setPerson] = useState(null);
  const [showPerson, setShowPerson] = useState(false);

  useEffect(() => {
    const areEqual = (person) => person.name === peopleSelected;
    const findPerson = () => {
      const filteredPerson = people.find(areEqual);
      setPerson(filteredPerson);
      setShowPerson(true);
    };
    findPerson();
  }, [peopleSelected, people]);

  return (
    <>
      {showPerson && (
        <div className="container text-secondary my-3">
          <div className="spaceship-img-container">
            <img src={image} width="100%" alt="spaceShip" />
          </div>
          <div className="ship-description-container p-2">
            <h2 className="mb-3 pt-2 px-2">{person.name}</h2>
            <div className="px-2 my-3">
              <Row className="py-2">
                <Col>
                  <h4>Height:</h4>
                  <span>{person.height}</span>
                </Col>
                <Col>
                  <h4>Birth Year</h4>
                  <span>{person.birth_year}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Gender:</h4>
                  <span>{person.gender}</span>
                </Col>
                <Col>
                  <h4>Mass</h4>
                  <span>{person.mass}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Skin Color</h4>
                  <span>{person.skin_color}</span>
                </Col>
                <Col>
                  <h4>Eye Color</h4>
                  <span>{person.eye_color}</span>
                </Col>
              </Row>
              <Row className="pt-2">
                <Row className="appearances-row py-2">
                  <h4 className="m-0">Films</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <PeopleFilms person={person} />
                  </div>
                </Row>
              </Row>
              <Row className="pt-2">
                <Row className="appearances-row py-2">
                  <h4 className="m-0">Ships</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <PeopleShips person={person} />
                  </div>
                </Row>
              </Row>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterCard;
