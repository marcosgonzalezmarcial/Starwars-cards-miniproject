import { Row, Col } from 'react-bootstrap'
import './card-styles.css'

const ShipCard = ({ shipSelectedData }) => {
  return (
    <div className="d-flex text-secondary my-3">
      <div className="col-6 col-md-5 col-lg-4 img-wrapper">
        <img
          className="w-100 h-100"
          src={shipSelectedData.imgUrl}
          alt={shipSelectedData.name}
        />
      </div>
      <div className="col-6 col-md-5 col-lg-4">
        <div className="card-description-container p-2">
          <h2 className="mb-3 pt-2 px-2">{shipSelectedData.name}</h2>

          <div className="px-2 my-3">
            <Row className="py-2">
              <Col>
                <h4>Model:</h4>
                <span>{shipSelectedData.model}</span>
              </Col>

              <Col>
                <h4>Manufacturer:</h4>
                <span>
                  {shipSelectedData.manufacturer
                    ? shipSelectedData.manufacturer
                    : 'unknown'}
                </span>
              </Col>
            </Row>

            <Row className="py-2">
              <Col>
                <h4>Cost in credits:</h4>
                <span>{shipSelectedData.cost_in_credits}</span>
              </Col>

              <Col>
                <h4>Atmospheric speed:</h4>
                <span>{shipSelectedData.max_atmosphering_speed}</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipCard
