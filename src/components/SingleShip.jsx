import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListOfPilots from "./ListOfPilots";
import ListOfFilms from "./ListOfFilms";
import { urlStringify } from "../utils/urlStringify";
import { Spinner } from "./Spinner/Spinner";
import { transformDataArray } from "../utils/transformDataArray";
import { starshipsMockedData } from "../utils/mocked-data";
import { fetchItem } from "../services/fetchItem";
import { TYPE_OF_DATA } from "../constants";
import "./single-item-page-styles.scss";
import "./view-more.scss";

const SingleShip = () => {
  const [ship, setShip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicSize, setDynamicSize] = useState({});
  let { starshipName } = useParams();
  const mainRef = useRef(null);

  //obvserving the size of the main container
  useEffect(() => {
    if (!mainRef || isLoading) return; // wait for the elementRef to be available and loading finishes
    const resizeObserver = new ResizeObserver((entries) => {
      setDynamicSize({
        mainWidth: entries[0].contentRect.width,
      });
    });
    resizeObserver.observe(mainRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);

    const shipNameFromUrl = urlStringify(starshipName);

    const { id } = starshipsMockedData.find(
      (ship) => ship.name === shipNameFromUrl
    );

    fetchItem({ id, typeOfData: TYPE_OF_DATA.STARSHIPS })
      .then((item) => {
        const [transformedShipData] = transformDataArray({
          // fetched data must be an array for implementation requirements
          fetchedData: [item],
          typeOfData: TYPE_OF_DATA.STARSHIPS,
        });
        setShip(transformedShipData);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [starshipName]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainRef} className="main text-secondary">
          <div className="page-img-container">
            <img src={ship.imgUrl} alt={ship.name} />
          </div>
          <div className="page-description-container flex-grow-1 bg-dark p-2">
            <h1 className="mb-3 pt-1 px-2">{ship.name}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Model:</h3>
                  <span>{ship.model}</span>
                </Col>
                <Col>
                  <h3>Length:</h3>
                  <span>{ship.length ? ship.length : "Unknown"}</span>
                </Col>
              </Row>
              <Row className="py-1"></Row>
              <Row className="py-1">
                <Col>
                  <h3>Atmospheric speed:</h3>
                  <span>{ship.max_atmosphering_speed}</span>
                </Col>
                <Col>
                  <h3>Crew:</h3>
                  <span>{ship.crew}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col className="pt-1">
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Appearances</h3>
                    <ListOfFilms filmsUrls={ship.films} />
                  </div>
                  {dynamicSize.mainWidth < 517 && ship.films?.length > 3 && (
                    <input type="checkbox" className="expand-btn" />
                  )}
                  {dynamicSize.mainWidth > 517 && ship.films?.length > 6 && (
                    <input type="checkbox" className="expand-btn" />
                  )}
                </Col>
                <Col className="pt-1">
                  {ship.pilots?.length === 0 ? (
                    <>
                      <h3 className="my-2">Pilots</h3>
                      <span>No pilots registered for this ship</span>
                    </>
                  ) : (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Starships</h3>
                      <ListOfPilots pilotsUrls={ship.pilots} />
                    </div>
                  )}
                  {dynamicSize.mainWidth < 517 && ship.pilots?.length > 4 && (
                    <input type="checkbox" className="expand-btn" />
                  )}
                  {dynamicSize.mainWidth > 517 && ship.pilots?.length > 6 && (
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
