import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { filmsMockedData } from "../utils/mocked-data";
import ListOfShips from "./ListOfShips";
import { urlStringify } from "../utils/urlStringify";
import { Spinner } from "./Spinner/Spinner";
import { transformDataArray } from "../utils/transformDataArray";
import { fetchItem } from "../services/fetchItem";
import { TYPE_OF_DATA } from "../constants";
import "./single-item-page-styles.scss";

const SingleFilm = () => {
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let { filmTitle } = useParams();

  const expandBtnStyles = {
    marginLeft: "calc(var(--bs-gutter-x) * 0.5)",
  };

  useEffect(() => {
    setIsLoading(true);

    const filmTitleFromUrl = urlStringify(filmTitle);

    const { id } = filmsMockedData.find(
      (film) => film.title === filmTitleFromUrl
    );

    fetchItem({ id, typeOfData: TYPE_OF_DATA.FILMS })
      .then((item) => {
        const [transformedFilmData] = transformDataArray({
          // fetched data must be an array for implementation requirements
          fetchedData: [item],
          typeOfData: TYPE_OF_DATA.FILMS,
        });
        // console.log(transformedFilmData);
        setFilm(transformedFilmData);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [filmTitle]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main className="main text-secondary">
          <div className="page-img-container">
            <img src={film.imgUrl} alt={film.title} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-1 mb-sm-3 pt-1 px-2">{film.title}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Episode:</h3>
                  <span>{film.episode_id}</span>
                </Col>
                <Col>
                  <h3>Director</h3>
                  <span>{film.director}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Producer:</h3>
                  <span>{film.producer}</span>
                </Col>
                <Col>
                  <h3>Release date</h3>
                  <span>{film.release_date}</span>
                </Col>
              </Row>
              <Row className="flex-column">
                <Col className="cutoff-text">
                  <h3 className="my-2">Ships</h3>
                  {film.starships?.length > 0 ? (
                    <ListOfShips shipsUrls={film.starships} />
                  ) : (
                    <span>No ships for this character</span>
                  )}
                </Col>
                <input
                  style={expandBtnStyles}
                  type="checkbox"
                  className="expand-btn"
                />
              </Row>
              {/* <Row className="py-1 flex-column">
                <Col className="pt-1 cutoff-text">
                  <h3 className="m-0 py-1">Ships</h3>
                  {film.starships?.length > 0 ? (
                    <ListOfShips shipsUrls={film.starships} />
                  ) : (
                    <span>There aren't ships for this character</span>
                  )}
                </Col>
                <input type="checkbox" className="expand-btn" />
              </Row> */}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SingleFilm;
