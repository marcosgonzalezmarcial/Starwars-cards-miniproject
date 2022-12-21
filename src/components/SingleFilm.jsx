import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListOfShips from "./ListOfShips";
import { Spinner } from "./Spinner/Spinner";
import { TYPE_OF_DATA } from "../constants";
import "./single-item-page-styles.scss";
import "./view-more.scss";
import { useSingleElementData } from "../hooks/useSingleElementData";

const SingleFilm = () => {
  const [dynamicSize, setDynamicSize] = useState({});

  let { filmTitle } = useParams();
  
  const { isLoading, elementData } = useSingleElementData({
    paramFromUrl: filmTitle,
    typeOfData: TYPE_OF_DATA.FILMS,
  });

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


  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainRef} className="main text-secondary">
          <div className="page-img-container">
            <img src={elementData.imgUrl} alt={elementData.title} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-1 mb-sm-3 pt-1 px-2">{elementData.title}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Episode:</h3>
                  <span>{elementData.episode_id}</span>
                </Col>
                <Col>
                  <h3>Director</h3>
                  <span>{elementData.director}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col className="pt-1">
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Starships</h3>
                    <ListOfShips listOfUrls={elementData.starships} />
                  </div>
                  {dynamicSize.mainWidth < 517 &&
                    elementData.starships?.length >= 3 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth >= 517 && null}
                </Col>
                <Col>
                  <h3 className="my-2">Release date</h3>
                  <span>{elementData.release_date}</span>
                </Col>
              </Row>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SingleFilm;
