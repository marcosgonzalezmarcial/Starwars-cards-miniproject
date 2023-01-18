import { Col, Row } from "react-bootstrap";
import ListOfItemsWrapper from "components/ListOfItemsWrapper";

const Film = ({ elementData }) => {
  return (
    <>
      <div className="page-img-container">
        <picture>
          <source media="(max-width: 575px)" srcSet={elementData.image_small} />
          <source media="(min-width: 576px)" srcSet={elementData.imgUrl} />
          <img src={elementData.imgUrl} alt={elementData.title} />
        </picture>
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
            <Col className="pt-1 w-50">
              {elementData.starships?.length === 0 ? (
                <>
                  <h3 className="my-2">Starships</h3>
                  <span>No starships registered for this character</span>
                </>
              ) : (
                <ListOfItemsWrapper
                  itemType="starships"
                  elementData={elementData}
                />
              )}
            </Col>
            <Col className="pt-1 w-50">
              <h3 className="my-2">Release date</h3>
              <span>{elementData.release_date}</span>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Film;
