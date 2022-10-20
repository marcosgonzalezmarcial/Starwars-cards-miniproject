import { useState, useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { useNavigate } from 'react-router-dom'
import starshipsJsonArr from '../../api/mocked-data/starshipMappedData.json'
import './Starships.css'
import { getTransformedShipsArray } from '../../api/getTransformedShipsArray'

const StarShips = () => {
	const [page, setPage] = useState(1)
	const [ships, setShips] = useState([])

	let navigate = useNavigate()

	useEffect(() => {
		getTransformedShipsArray(page).then(data =>
			setShips(prev => [...prev, ...data])
		)
	}, [page])

	const handleClick = e => {
		const shipSelected = e.target.textContent
		const [ship] = starshipsJsonArr.filter(item => item.name === shipSelected)
		navigate(`${ship.id}`)
	}

	return (
		<InfiniteScroll
			dataLength={ships.length}
			next={() => setPage(ships.length < 36 && page + 1)}
			hasMore={ships.length < 36 ? true : false}
			loader={<div className="text-white display-4">Cargando...</div>}
		>
			<div className="my-3 my-md-5 shipsGrid">
				{ships.map((ship, index) => (
					<div key={index} className="starship-card">
						<div className="card-hero">
							<img className="card-hero-img" src={ship.url} alt="starship" />
						</div>
						<div className="text-secondary bg-dark p-3 card-info">
							<h4 className="card-ship-title" onClick={handleClick}>
								{ship.name}
							</h4>
							<p>{ship.model}</p>
						</div>
					</div>
				))}
			</div>
		</InfiniteScroll>
	)
}

export default StarShips
