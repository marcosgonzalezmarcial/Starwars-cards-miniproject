import { Row, Col } from "react-bootstrap";
import movieImage from "../assets/returnOfJedi.jpg";
import "./card-styles.css";

const FilmCard = ({ filmSelectedData }) => {
  return (
    <div className="d-flex text-secondary my-3">
      <div className="col-6 col-md-5 col-lg-4 inner-card-img-wrapper">
        <img src={movieImage} alt={filmSelectedData.title} />
      </div>
      <div className="col-6 col-md-5 col-lg-4">
        <div className="inner-card-description-container p-2">
          <h2 className="mb-3 pt-2 px-2">{filmSelectedData.title}</h2>

          <div className="px-2 my-3">
            <Row className="py-2">
              <Col>
                <h4>Episode:</h4>
                <span>{filmSelectedData.episode_id}</span>
              </Col>

              <Col>
                <h4>Director:</h4>
                <span>{filmSelectedData.director}</span>
              </Col>
            </Row>

            <Row className="py-2">
              <Col className="d-none d-sm-block">
                <h4>Producer:</h4>
                <span>{filmSelectedData.producer}</span>
              </Col>

              <Col className="d-none d-sm-block">
                <h4>Release date:</h4>
                <span>{filmSelectedData.release_date}</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
