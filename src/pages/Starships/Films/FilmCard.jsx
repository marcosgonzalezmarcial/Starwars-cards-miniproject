import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import movieImage from "../../../assets/returnOfJedi.jpg";
import "./filmcard.css";

const FilmCard = ({ filmSelected, ship }) => {
  const [filmUrl, setFilmUrl] = useState(null);
  const [film, setFilm] = useState(null);

  useEffect(() => {
    ship.films.map((url) => {
      const getFilm = async () => {
        const filmFound = await fetchData(url);

        if (filmFound.title === filmSelected) {
          const newFilm = await fetchData(url);
          setFilm(newFilm);
          setFilmUrl(url);
        }
      };
      getFilm();
      return null;
    });
    // window.scrollTo(0, document.body.scrollHeight);
  }, [ship.films, filmSelected, filmUrl]);

  return (
    <>
      {film && (
        <div className="d-flex container-filmCard text-secondary my-3">
          <Col sm={6}>
            <img style={{ width: "100%" }} src={movieImage} alt="spaceShip" />
          </Col>
          <Col sm={6}>
            <div className="movie-description-container p-2">
              <h2 className="mb-3 pt-2 px-2">{film.title}</h2>
              <div className="px-2 my-3">
                <Row className="py-2">
                  <Col>
                    <h4>Episode:</h4>
                    <span>{film.episode_id}</span>
                  </Col>

                  <Col>
                    <h4>Director:</h4>
                    <span>{film.director}</span>
                  </Col>
                </Row>

                <Row className="py-2">
                  <Col>
                    <h4>Producer:</h4>
                    <span>{film.producer}</span>
                  </Col>

                  <Col>
                    <h4>Release date:</h4>
                    <span>{film.release_date}</span>
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

export default FilmCard;
