import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import starshipsMappedData from '../services/mocked-data/starshipsMappedData.json'
import './grid-styles.css'
import { getTransformedShipsArray } from '../services/getTransformedShipsArray'

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
		const [ship] = starshipsMappedData.filter(
			item => item.name === shipSelected
		)
		// navigate(`${ship.id}`)
		navigate(`${ship.name.replaceAll(' ', '~')}`)
	}

	return (
		<InfiniteScroll
			dataLength={ships.length}
			next={() => setPage(prev => ships.length < 36 && prev + 1)}
			hasMore={ships.length < 36 && true}
			loader={<div className="text-white display-4">Loading...</div>}
			className="my-3 my-md-4 grid-container"
		>
			{ships.map((ship, index) => (
				<div key={index} className="grid-element-card">
					<div className="grid-card-hero">
						<img
							className="grid-card-hero-img"
							src={ship.imgUrl}
							alt={ship.name}
						/>
					</div>
					<div className="text-secondary bg-dark p-3 grid-card-info">
						<h4 onClick={handleClick}>{ship.name}</h4>
						<p>{ship.model}</p>
					</div>
				</div>
			))}
		</InfiniteScroll>
	)
}

export default StarShips
