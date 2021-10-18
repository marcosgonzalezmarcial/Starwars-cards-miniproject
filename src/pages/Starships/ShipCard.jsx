import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import image from "../../assets/spaceship.jpeg";
import Films from "./Films/Films";
import Pilots from "./Pilots/Pilots";

const ShipCard = ({ ships, shipSelected }) => {
  const [ship, setShip] = useState(null);
  const [showShip, setShowShip] = useState(false);
  const [showPilotCard, setShowPilotCard] = useState(false);
  const [showFilmCard, setShowFilmCard] = useState(false);

  useEffect(() => {
    const areEqual = (ship) => ship.name === shipSelected;
    const findShip = () => {
      const filteredShip = ships.find(areEqual);
      setShip(filteredShip);
      setShowShip(true);
    };
    findShip();
  }, [shipSelected, ships]);

  return (
    <>
      {showShip && (
        <div className="container text-secondary my-3">
          <div className="spaceship-img-container">
            <img src={image} width="100%" alt="spaceShip" />
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
                    <Films
                      showFilmCard={showFilmCard}
                      setShowFilmCard={setShowFilmCard}
                      setShowPilotCard={setShowPilotCard}
                      ship={ship}
                    />
                  </div>
                </Row>

                <Row className="appearances-row py-2 mt-2">
                  <h4 className="pl-0">Pilots</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <Pilots
                      showPilotCard={showPilotCard}
                      setShowPilotCard={setShowFilmCard}
                      setShowFilmCard={setShowPilotCard}
                      ship={ship}
                    />
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

export default ShipCard;
