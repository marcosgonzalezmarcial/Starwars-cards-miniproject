import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import pilotImage from "../../assets/pilot.jpeg";
import "./pilotcard.css";

const PilotCard = ({ pilotSelected, ship }) => {
  const [pilotUrl, setPilotUrl] = useState(null);
  const [pilot, setPilot] = useState(null);

  useEffect(() => {
    ship.pilots.map((url) => {
      const getPilot = async () => {
        const pilotFound = await fetchData(url);

        if (pilotFound.name === pilotSelected) {
          const newPilot = await fetchData(url);
          setPilot(newPilot);
          setPilotUrl(url);
        }
      };
      getPilot();
      return null;
    });
    window.scrollTo(0, document.body.scrollHeight);
  }, [ship.pilots, pilotSelected, pilotUrl]);

  return (
    <>
      {pilot && (
        <div className="d-flex container-pilotCard text-secondary my-3">
          <Col sm={6}>
            <img style={{ width: "100%" }} src={pilotImage} alt="spaceShip" />
          </Col>
          <Col sm={6}>
            <div className="movie-description-container p-2">
              <h2 className="mb-3 pt-2 px-2">{pilot.name}</h2>

              <div className="px-2 my-3">
                <Row className="py-2">
                  <Col>
                    <h4>Height:</h4>
                    <span>{pilot.height}</span>
                  </Col>

                  <Col>
                    <h4>Mass:</h4>
                    <span>{pilot.mass}</span>
                  </Col>
                </Row>

                <Row className="py-2">
                  <Col>
                    <h4>Birth year:</h4>
                    <span>{pilot.birth_year}</span>
                  </Col>

                  <Col>
                    <h4>Gender:</h4>
                    <span>{pilot.gender}</span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </div>
      )}
    </>
  );
};

export default PilotCard;
