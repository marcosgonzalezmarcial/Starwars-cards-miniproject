import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StarshipFilms from "./Films/StarshipFilms";
import StarshipPilots from "./Pilots/StarshipPilots";
import starshipsJsonArr from "../api/mocked-data/starshipMappedData.json";
import { fetchSingleShip } from "../api/fetchSingleShip";

const SingleShip = () => {
  const [ship, setShip] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const [shipFiltered] = starshipsJsonArr.filter(
      (starship) => starship.id === Number(id)
    );
    setImg(shipFiltered.url);

    fetchSingleShip(id).then((ship) => {
      setShip(ship);
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
        <div className="container text-secondary my-3">
          <div className="spaceship-img-container">
            <img
              src={img}
              width="100%"
              style={{ aspectRatio: 16 / 9, color: "transparent" }}
              alt="spaceShip"
            />
          </div>
          <div className="ship-description-container p-2">
            <h2 className="mb-3 pt-2 px-2">{ship.name}</h2>
            <div className="px-2 my-3">
              <Row className="py-2">
                <Col>
                  <h4>Model:</h4>
                  <span>{ship.model}</span>
                </Col>
                <Col>
                  <h4>Manufacturer:</h4>
                  <span>
                    {ship.manufacturer ? ship.manufacturer : "unknown"}
                  </span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Cost in credits:</h4>
                  <span>{ship.cost_in_credits}</span>
                </Col>
                <Col>
                  <h4>Atmospheric speed:</h4>
                  <span>{ship.max_atmosphering_speed}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Length:</h4>
                  <span>{ship.length}</span>
                </Col>
                <Col>
                  <h4>Crew:</h4>
                  <span>{ship.crew}</span>
                </Col>
              </Row>
              <Row>
                <Row className="appearances-row py-2">
                  <h4>Appearances</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <StarshipFilms filmsUrls={ship.films} />
                  </div>
                </Row>

                <Row className="appearances-row py-2 mt-2">
                  <h4 className="pl-0">Pilots</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <StarshipPilots ship={ship} />
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
