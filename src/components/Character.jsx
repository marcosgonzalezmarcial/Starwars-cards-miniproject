import { Col, Row } from "react-bootstrap";
import ListOfItemsWrapper from "components/ListOfItemsWrapper";

const Character = ({ elementData, handleItemClick }) => {
  // console.log(elementData);
  return (
    <>
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
              <p className="list-element" onClick={handleItemClick}>
                {elementData.homeworld?.toUpperCase().at(0)}
                {elementData.homeworld?.substring(1)}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="py-1 w-50">
              {elementData.films?.length === 0 ? (
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
          </Row>
        </div>
      </div>
    </>
  );
};

export default Character;
