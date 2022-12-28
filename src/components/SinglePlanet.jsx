import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Spinner } from "components/Spinner";
import { TYPE_OF_DATA } from "../constants";
import { useSingleElementData } from "hooks/useSingleElementData";
import ListOfItemsWrapper from "./ListOfItemsWrapper";

const SinglePlanet = () => {
  let { planetName } = useParams();
  const mainRef = useRef(null);

  const { isLoading, elementData } = useSingleElementData({
    paramFromUrl: planetName,
    typeOfData: TYPE_OF_DATA.PLANETS,
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainRef} className="main text-secondary">
          <div className="page-img-container">
            <img src={elementData.imgUrl} alt={elementData.name} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-3 pt-1 px-2">{elementData.name}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Terrain:</h3>
                  <span>{elementData.terrain}</span>
                </Col>
                <Col>
                  <h3>Population:</h3>
                  <span>{elementData.population}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Diameter:</h3>
                  <span>{elementData.diameter}</span>
                </Col>
                <Col>
                  <h3>Rotation period:</h3>
                  <span>{elementData.rotation_period}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col className="pt-1">
                  {elementData.films?.length === 0 ? (
                    <>
                      <h3 className="my-2">Appearances</h3>
                      <span>No films registered for this character</span>
                    </>
                  ) : (
                    <ListOfItemsWrapper
                      itemType="films"
                      elementData={elementData}
                    />
                  )}
                </Col>

                <Col className="pt-1">
                  {elementData.films?.length === 0 ? (
                    <>
                      <h3 className="my-2">Residents</h3>
                      <span>No residents registered for this planet</span>
                    </>
                  ) : (
                    <ListOfItemsWrapper
                      itemType="characters"
                      itemSubType="residents"
                      elementData={elementData}
                    />
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SinglePlanet;
