import { useState, useEffect } from 'react'
import { fetchShips } from '../../api/fetchShips'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import data from '../../helpers/starshipMappedData.json'

const StarShips = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [ships, setShips] = useState([])

	let history = useHistory()

	useEffect(() => {
		setIsLoading(true)
		const loadShips = async () => {
			const newShips = await fetchShips(page)
			setShips(prev => [...prev, ...newShips])
			setIsLoading(false)
		}
		loadShips()
	}, [page, setShips])

	const handleClick = e => {
		const shipSelected = e.target.textContent
		const ship = data.starships.filter(item => item.name === shipSelected)
		history.push(`/starships/${ship[0].id}`)
	}

	return (
		<>
			{isLoading && (
				<Container className="m-3">
					<div className="text-white display-4">Cargando...</div>
				</Container>
			)}
			<InfiniteScroll
				dataLength={ships.length}
				next={() => setPage(ships.length < 36 && page + 1)}
				hasMore={ships.length < 36 ? true : false}
			>
				{ships.map(ship => (
					<div
						key={Date.now()}
						className="container text-secondary bg-dark my-4 p-3 flex-column"
					>
						<h4 className="ship-title" onClick={handleClick}>
							{ship.name}
						</h4>
						<p>{ship.model}</p>
					</div>
				))}
			</InfiniteScroll>
		</>
	)
}

export default StarShips
