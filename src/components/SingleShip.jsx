import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ListOfPilots from './ListOfPilots'
import ListOfFilms from './ListOfFilms'
import { urlStringify } from '../utils/urlStringify'
import { Spinner } from './Spinner/Spinner'
import { transformDataArray } from '../utils/transformDataArray'
import { starshipsMockedData } from '../utils/mocked-data'
import { fetchItem } from '../services/fetchItem'
import { TYPE_OF_DATA } from '../constants'

const SingleShip = () => {
	const [ship, setShip] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	let { starshipName } = useParams()

	useEffect(() => {
		setIsLoading(true)

		const shipNameFromUrl = urlStringify(starshipName)

		const { id } = starshipsMockedData.find(
			ship => ship.name === shipNameFromUrl
		)

		fetchItem({ id, typeOfData: TYPE_OF_DATA.STARSHIPS })
			.then(item => {
				const [transformedShipData] = transformDataArray({
					// fetched data must be an array for implementation requirements
					fetchedData: [item],
					typeOfData: TYPE_OF_DATA.STARSHIPS,
				})
				setShip(transformedShipData)
			})
			.catch(console.log)
			.finally(() => setIsLoading(false))
	}, [starshipName])

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<main className="main text-secondary m-0-auto mt-3 mt-sm-4 mt-md-5">
					<div className="page-img-container">
						<img src={ship.imgUrl} alt={ship.name} />
					</div>
					<div className="page-description-container flex-grow-1 bg-dark p-2">
						<h2 className="mb-2 pt-1 px-2">{ship.name}</h2>
						<div className="px-2">
							<Row className="py-1">
								<Col>
									<h3>Model:</h3>
									<span>{ship.model}</span>
								</Col>
								<Col>
									<h3>Manufacturer:</h3>
									<span>
										{ship.manufacturer ? ship.manufacturer : 'Unknown'}
									</span>
								</Col>
							</Row>
							<Row className="py-1">
								{/* <Col>
									<h3>Cost in credits:</h3>
									<span>{ship.cost_in_credits}</span>
								</Col> */}
								{/* <Col>
									<h3>Atmospheric speed:</h3>
									<span>{ship.max_atmosphering_speed}</span>
								</Col> */}
							</Row>
							<Row className="py-1">
								<Col>
									<h3>Atmospheric speed:</h3>
									<span>{ship.max_atmosphering_speed}</span>
								</Col>
								<Col>
									<h3>Crew:</h3>
									<span>{ship.crew}</span>
								</Col>
							</Row>
							<Row className="py-1">
								<Col className="pt-1">
									<h3 className="m-0 py-1">Appearances</h3>
									<ListOfFilms filmsUrls={ship.films} />
								</Col>
								<Col className="pt-1">
									<h3 className="m-0 py-1">Pilots</h3>
									{ship.pilots?.length > 0 ? (
										<ListOfPilots pilotsUrls={ship.pilots} />
									) : (
										<span>No pilots registered for this ship</span>
									)}
								</Col>
							</Row>
						</div>
					</div>
				</main>
			)}
		</>
	)
}

export default SingleShip
