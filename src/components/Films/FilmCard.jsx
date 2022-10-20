import React from 'react'
import { Row, Col } from 'react-bootstrap'
import movieImage from '../../assets/returnOfJedi.jpg'
import './filmcard.css'

const FilmCard = ({ filmSelectedData }) => {
	return (
		<>
			{filmSelectedData && (
				<div className="d-flex container-filmCard text-secondary my-3">
					<Col sm={6}>
						<img style={{ width: '100%' }} src={movieImage} alt="spaceShip" />
					</Col>
					<Col sm={6}>
						<div className="movie-description-container p-2">
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
									<Col>
										<h4>Producer:</h4>
										<span>{filmSelectedData.producer}</span>
									</Col>

									<Col>
										<h4>Release date:</h4>
										<span>{filmSelectedData.release_date}</span>
									</Col>
								</Row>
							</div>
						</div>
					</Col>
				</div>
			)}
		</>
	)
}

export default React.memo(FilmCard)
