import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ListOfFilms from "./ListOfFilms";
import ListOfShips from "./ListOfShips";
import { Spinner } from "./Spinner/Spinner";
import { TYPE_OF_DATA } from "../constants";
import "./single-item-page-styles.scss";
import "./view-more.scss";
import { useSingleElementData } from "../hooks/useSingleElementData";

const SingleCharacter = () => {
  const [dynamicSize, setDynamicSize] = useState({});

  let { characterName } = useParams();

  const { isLoading, elementData } = useSingleElementData({
    paramFromUrl: characterName,
    typeOfData: TYPE_OF_DATA.PEOPLE,
  });


  let navigate = useNavigate();

  const mainRef = useRef(null);

  //obvserving the size of the ListOfFilms container (main)
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

  const handleClick = useCallback(
    (e) => {
      const planetSelected = e.target.textContent;
      navigate(`/planets/${planetSelected}`);
    },
    [navigate]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainRef} className="main text-secondary">
          <div className="page-img-container">
            <img src={elementData.image} alt={elementData.name} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-2 mb-sm-3 pt-1 px-2">{elementData.name}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Height:</h3>
                  <span>{elementData.height}</span>
                </Col>
                <Col>
                  <h3>Birth Year</h3>
                  <span>{elementData.birth_year}</span>
                </Col>
              </Row>
              <Row className="pt-1">
                <Col>
                  <h3>Species</h3>
                  <span>{elementData.species}</span>
                </Col>
                <Col>
                  <h3>Homeworld</h3>
                  <p className="list-element" onClick={handleClick}>
                    {elementData.homeworld?.toUpperCase().at(0)}
                    {elementData.homeworld?.substring(1)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="py-1">
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Appearances</h3>
                    <ListOfFilms listOfUrls={elementData.films} />
                  </div>
                  {dynamicSize.mainWidth < 518 &&
                    elementData.films?.length > 3 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                </Col>
                <Col className="pt-1">
                  {elementData.starships?.length === 0 ? (
                    <>
                      <h3 className="my-2">Starships</h3>
                      <span>No starships registered for this elementData</span>
                    </>
                  ) : (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Starships</h3>
                      <ListOfShips listOfUrls={elementData.starships} />
                    </div>
                  )}
                  {dynamicSize.mainWidth < 518 &&
                    elementData.starships?.length > 3 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth > 517 &&
                    elementData.starships?.length > 6 && (
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

export default SingleCharacter;
