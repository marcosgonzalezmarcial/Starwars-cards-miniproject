import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListOfPilots from "components/ListOfPilots";
import ListOfFilms from "components/ListOfFilms";
import { Spinner } from "components/Spinner";
import { TYPE_OF_DATA } from "../constants";
// import "./single-item-page-styles.scss";
// import "./view-more.scss";
import { useSingleElementData } from "hooks/useSingleElementData";
import { useWidthObserver } from "hooks/useWidthObserver";

const SingleShip = () => {
  let { starshipName } = useParams();
  const mainRef = useRef(null);

  const { isLoading, elementData } = useSingleElementData({
    paramFromUrl: starshipName,
    typeOfData: TYPE_OF_DATA.STARSHIPS,
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
          <div className="page-description-container flex-grow-1 bg-dark p-2">
            <h1 className="mb-3 pt-1 px-2">{elementData.name}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Model:</h3>
                  <span>{elementData.model}</span>
                </Col>
                <Col>
                  <h3>Length:</h3>
                  <span>
                    {elementData.length ? elementData.length : "Unknown"}
                  </span>
                </Col>
              </Row>
              <Row className="py-1"></Row>
              <Row className="py-1">
                <Col>
                  <h3>Atmospheric speed:</h3>
                  <span>{elementData.max_atmosphering_speed}</span>
                </Col>
                <Col>
                  <h3>Crew:</h3>
                  <span>{elementData.crew}</span>
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
                  {elementData.pilots?.length === 0 ? (
                    <>
                      <h3 className="my-2">Pilots</h3>
                      <span>No pilots registered for this ship</span>
                    </>
                  ) : (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Starships</h3>
                      <ListOfPilots listOfUrls={elementData.pilots} />
                    </div>
                  )}
                  {dynamicSize.mainWidth < 517 &&
                    elementData.pilots?.length > 4 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth > 517 &&
                    elementData.pilots?.length > 6 && (
                      <input type="checkbox" className="expand-btn" />
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

export default SingleShip;
