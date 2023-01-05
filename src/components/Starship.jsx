import { Col, Row } from "react-bootstrap";
import ListOfItemsWrapper from "components/ListOfItemsWrapper";

const Starship = ({ elementData, handleItemClick }) => {
  return (
    <>
      <div className="page-img-container">
        <img src={elementData.imgUrl} alt={elementData.name} />
      </div>
      <div className="page-description-container bg-dark p-2">
        <h1 className="mb-3 pt-1 px-2">{elementData.name}</h1>
        <div className="px-2">
          <Row className="py-1">
            <Col>
              <h3>Model:</h3>
              <span>{elementData.model}</span>
            </Col>
            <Col>
              <h3>Length:</h3>
              <span>{elementData.length ? elementData.length : "Unknown"}</span>
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
            <Col className="pt-1 w-50">
              {elementData?.films?.length === 0 ? (
                <>
                  <h3 className="my-2">Appearances</h3>
                  <span>No films registered for this character</span>
                </>
              ) : (
                <ListOfItemsWrapper
                  itemType="films"
                  elementData={elementData}
                />
              )}
            </Col>
            <Col className="pt-1 w-50">
              {elementData.pilots?.length === 0 ? (
                <>
                  <h3 className="my-2">Pilots</h3>
                  <span>No pilots registered for this ship</span>
                </>
              ) : (
                <ListOfItemsWrapper
                  itemType="characters"
                  itemSubType="pilots"
                  elementData={elementData}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Starship;