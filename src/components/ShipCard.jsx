import { Row, Col } from 'react-bootstrap'

const ShipCard = ({ shipSelectedData }) => {
	return (
		<div className="d-flex container-pilotCard text-secondary my-3">
			<Col sm={6}>
				<img
					style={{ width: '100%' }}
					src={shipSelectedData.imgUrl}
					alt="spaceShip"
				/>
			</Col>
			<Col sm={6}>
				<div className="movie-description-container p-2">
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
			</Col>
		</div>
	)
}

export default ShipCard
