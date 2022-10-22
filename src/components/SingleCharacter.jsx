import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import charactersMappedData from "../api/mocked-data/peopleMappedData.json";
import { fetchSingleCharacter } from "../api/fetchSingleCharacter";
import ListOfFilms from "./ListOfFilms";
import ListOfShips from "./ListOfShips";

const SingleCharacter = () => {
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState("");

  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const [characterFiltered] = charactersMappedData.filter(
      (character) => character.id === Number(id)
    );
    setImg(characterFiltered.image);

    fetchSingleCharacter(id).then((character) => {
      setCharacter(character);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Container className="m-3">
          <div className="text-white display-4">Cargando...</div>
        </Container>
      ) : (
        <div className="container wrapper text-secondary my-3">
          <div className="img-container">
            <img src={img} alt="spaceShip" />
          </div>
          <div className="page-description-container p-2">
            <h2 className="mb-3 pt-2 px-2">{character.name}</h2>
            <div className="px-2 my-3">
              <Row className="py-2">
                <Col>
                  <h4>Height:</h4>
                  <span>{character.height}</span>
                </Col>
                <Col>
                  <h4>Birth Year</h4>
                  <span>{character.birth_year}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Gender:</h4>
                  <span>{character.gender}</span>
                </Col>
                <Col>
                  <h4>Mass</h4>
                  <span>{character.mass}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Skin Color</h4>
                  <span>{character.skin_color}</span>
                </Col>
                <Col>
                  <h4>Eye Color</h4>
                  <span>{character.eye_color}</span>
                </Col>
              </Row>
              <Col className="pt-2">
                <div className="py-2">
                  <h4 className="m-0">Films</h4>
                </div>
                <Row>
                  <ListOfFilms filmsUrls={character.films} />
                </Row>
              </Col>
              <Row className="pt-2">
                <div className="py-2">
                  <h4 className="m-0">Ships</h4>
                </div>
                <Row>
                  <div className="container-films">
                    <ListOfShips shipsUrls={character.starships} />
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

export default SingleCharacter;
