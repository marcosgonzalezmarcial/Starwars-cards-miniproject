import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { Spinner } from '../components/Spinner/Spinner'
import '../styles.scss'
import { getTransformedDataArray } from '../services/getTransformedDataArray'
import { TYPE_OF_DATA } from '../constants'
import { sortObjItems } from '../utils/sortItems'

const StarShips = () => {
	const [page, setPage] = useState(1)
	const [ships, setShips] = useState([])
	const { searchItems } = useSearch()

	let navigate = useNavigate()

	useEffect(() => {
		getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.STARSHIPS })
			.then(data => {
				//checking data is not null
				data && setShips(prev => sortObjItems([...prev, ...data]))
			})
			.catch(error => {
				console.log(error)
			})
	}, [page])

	const handleClick = e => {
		const shipSelected = e.target.textContent
		navigate(`${shipSelected.replaceAll(' ', '~')}`)
	}

	return (
		<>
			{searchItems.length > 0 ? (
				<div className="my-3 my-md-4 grid-container">
					{searchItems?.map(starship => (
						<div
							key={`${starship.model}${starship.crew}`}
							className="grid-element-card"
						>
							<div className="grid-card-hero">
								<img
									className="grid-card-hero-img"
									src={starship.imgUrl}
									alt={starship.name}
								/>
							</div>
							<div className="text-secondary bg-dark p-3 grid-card-info">
								<h4 onClick={handleClick}>{starship.name}</h4>
								<p>{starship.model}</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<InfiniteScroll
					dataLength={ships.length}
					next={() => setPage(prev => ships.length < 36 && prev + 1)}
					hasMore={ships.length < 36 && true}
					loader={<Spinner />}
					className={`my-3 my-md-4 ${ships.length > 0 ? 'grid-container' : ''}`}
				>
					{ships.map(ship => (
						<div
							key={`${ship.model}${ship.crew}`}
							className="grid-element-card"
						>
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
			)}
		</>
	)
}

export default StarShips
