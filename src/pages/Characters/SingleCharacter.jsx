import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CharacterFilms from "./CharacterFilms";
import CharacterShips from "./CharacterShips";

const SingleShip = () => {
  const [person, setPerson] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState("");

  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
      })
      .catch(console.log);
    fetch(`https://miadil.github.io/starwars-api/api/id/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setImg(data.image);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Container className="m-3">
          <div className="text-white display-4">Cargando...</div>
        </Container>
      ) : (
        <div className="container text-secondary my-3">
          <div className="spaceship-img-container">
            <img src={img} width="100%" alt="spaceShip" />
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
                    <CharacterFilms id={id} />
                  </div>
                </Row>
              </Row>
              <Row className="pt-2">
                <Row className="appearances-row py-2">
                  <h4 className="m-0">Ships</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <CharacterShips id={id} />
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

export default SingleShip;
