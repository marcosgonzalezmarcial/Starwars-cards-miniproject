import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListOfPilots from "./ListOfPilots";
import ListOfFilms from "./ListOfFilms";
import { Spinner } from "./Spinner/Spinner";
import { TYPE_OF_DATA } from "../constants";
import "./single-item-page-styles.scss";
import "./view-more.scss";
import { useSingleElementData } from "../hooks/useSingleElementData";
import { useWidthObserver } from "../hooks/useWidthObserver";

const SinglePlanet = () => {
  // const [dynamicSize, setDynamicSize] = useState({});

  let { planetName } = useParams();
  const mainRef = useRef(null);

  const { isLoading, elementData } = useSingleElementData({
    paramFromUrl: planetName,
    typeOfData: TYPE_OF_DATA.PLANETS,
  });

  //obvserving the size of the ListOfFilms container (main)
  const { dynamicSize } = useWidthObserver({ isLoading, mainRef });

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
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Appearances</h3>
                    <ListOfFilms listOfUrls={elementData.films} />
                  </div>
                  {dynamicSize.mainWidth < 517 &&
                    elementData.films?.length > 3 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth > 517 &&
                    elementData.films?.length > 6 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                </Col>

                <Col className="pt-1">
                  {elementData.residents?.length === 0 ? (
                    <>
                      <h3 className="my-2">Residents</h3>
                      <span>No residents registered for this ship</span>
                    </>
                  ) : (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Residents</h3>
                      <ListOfPilots listOfUrls={elementData.residents} />
                    </div>
                  )}
                  {dynamicSize.mainWidth < 517 &&
                    elementData.residents?.length > 4 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth > 517 &&
                    elementData.residents?.length > 10 &&
                    window.innerWidth > 768 &&
                    null}
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
