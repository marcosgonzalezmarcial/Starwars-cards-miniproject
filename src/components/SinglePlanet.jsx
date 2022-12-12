import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListOfPilots from "./ListOfPilots";
import ListOfFilms from "./ListOfFilms";
import { urlStringify } from "../utils/urlStringify";
import { Spinner } from "./Spinner/Spinner";
import { transformDataArray } from "../utils/transformDataArray";
import { planetsMockedData } from "../utils/mocked-data";
import { TYPE_OF_DATA } from "../constants";
import { fetchItem } from "../services/fetchItem";
import "./single-item-page-styles.scss";
import "./view-more.scss";

const SinglePlanet = () => {
  const [planet, setPlanet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicSize, setDynamicSize] = useState({});

  let { planetName } = useParams();
  const mainRef = useRef(null);

  //obvserving the size of the ListOfFilms container
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
    const planetNameFromUrl = urlStringify(planetName);

    const { id } = planetsMockedData.find(
      (planet) => planet.name === planetNameFromUrl
    );

    fetchItem({ id, typeOfData: TYPE_OF_DATA.PLANETS })
      .then((item) => {
        const [transformedPlanetData] = transformDataArray({
          // fetched data must be an array for implementation requirements
          fetchedData: [item],
          typeOfData: TYPE_OF_DATA.PLANETS,
        });
        setPlanet(transformedPlanetData);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [planetName]);

  planet.residents?.length > 0 && planet.residents?.length < 5 ? (
    <>
      <div className="flex-column">
        <h3 className="my-2">Residents</h3>
        <ListOfPilots pilotsUrls={planet.residents} />
      </div>
    </>
  ) : planet.residents?.length >= 5 ? (
    <>
      <div className="flex-column cutoff-text">
        <h3 className="my-2">Residents</h3>
        <ListOfPilots pilotsUrls={planet.residents} />
      </div>
      <input type="checkbox" className="expand-btn" />
    </>
  ) : (
    <>
      <h3 className="my-2">Residents</h3>
      <span>No residents registered for this planet</span>
    </>
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainRef} className="main text-secondary">
          <div className="page-img-container">
            <img src={planet.imgUrl} alt={planet.name} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-3 pt-1 px-2">{planet.name}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Terrain:</h3>
                  <span>{planet.terrain}</span>
                </Col>
                <Col>
                  <h3>Population:</h3>
                  <span>{planet.population}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Diameter:</h3>
                  <span>{planet.diameter}</span>
                </Col>
                <Col>
                  <h3>Rotation period:</h3>
                  <span>{planet.rotation_period}</span>
                </Col>
              </Row>
              <Row className="py-1">
                {/* <Col className="pt-1 ">{renderPlanetFilms}</Col> */}
                <Col className="pt-1">
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Appearances</h3>
                    <ListOfFilms filmsUrls={planet.films} />
                  </div>
                  {dynamicSize.mainWidth < 517 && planet.films?.length > 3 && (
                    <input type="checkbox" className="expand-btn" />
                  )}
                  {dynamicSize.mainWidth > 517 && planet.films?.length > 6 && (
                    <input type="checkbox" className="expand-btn" />
                  )}
                </Col>
                {/* <Col className="pt-1">{renderPlanetResidents}</Col> */}
                <Col className="pt-1">
                  {planet.pilots?.length === 0 ? (
                    <>
                      <h3 className="my-2">Pilots</h3>
                      <span>No pilots registered for this ship</span>
                    </>
                  ) : (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Residents</h3>
                      <ListOfPilots pilotsUrls={planet.residents} />
                    </div>
                  )}
                  {dynamicSize.mainWidth < 517 &&
                    planet.residents?.length > 4 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth > 517 &&
                    planet.residents?.length > 10 && (
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

export default SinglePlanet;
