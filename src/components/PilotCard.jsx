import { Row, Col } from 'react-bootstrap'
import './card-styles.css'

const PilotCard = ({ pilotSelectedData }) => {
  return (
    <div className="d-flex text-secondary my-3">
      <div className="col-6 col-md-5 col-lg-4 img-wrapper">
        <img
          className="w-100 h-100"
          src={pilotSelectedData.image}
          alt={pilotSelectedData.name}
        />
      </div>
      <div className="col-6 col-md-5 col-lg-4">
        <div className="card-description-container p-2">
          <h2 className="mb-3 pt-2 px-2">{pilotSelectedData.name}</h2>

          <div className="px-2 my-3">
            <Row className="py-2">
              <Col>
                <h4>Height:</h4>
                <span>{pilotSelectedData.height}</span>
              </Col>

              <Col>
                <h4>Mass:</h4>
                <span>{pilotSelectedData.mass}</span>
              </Col>
            </Row>

            <Row className="py-2">
              <Col>
                <h4>Birth year:</h4>
                <span>{pilotSelectedData.birth_year}</span>
              </Col>

              <Col>
                <h4>Gender:</h4>
                <span>{pilotSelectedData.gender}</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PilotCard
