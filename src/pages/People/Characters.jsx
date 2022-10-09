import { useState, useEffect } from 'react'
import { fetchPeople } from '../../api/fetchPeople'
import InfiniteScroll from 'react-infinite-scroll-component'
import './character-card.css'
import { useHistory } from 'react-router-dom'
import data from '../../helpers/peopleMappedData.json'

const Characters = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [people, setPeople] = useState([])

	let history = useHistory()

	useEffect(() => {
		setIsLoading(true)
		const loadPeople = async () => {
			const newPeople = await fetchPeople(page)
			setPeople(prev => [...prev, ...newPeople])
			setIsLoading(false)
		}
		loadPeople()
	}, [page, setPeople])

	const handleClick = e => {
		const personSelected = e.target.textContent
		const person = data.people.filter(item => item.name === personSelected)
		history.push(`/people/${person[0].url}`)
	}

	return (
		<>
			<InfiniteScroll
				dataLength={people.length}
				next={() => setPage(people.length < 82 && page + 1)}
				hasMore={people.length < 82 ? true : false}
			>
				{people.map(people => (
					<div
						key={Date.now() * Math.random()}
						className="container  rounded text-center text-secondary bg-dark my-4 p-3 flex-column"
					>
						<h4 className="ship-title" onClick={handleClick}>
							{people.name}
						</h4>
					</div>
				))}
			</InfiniteScroll>
			{isLoading && <h1>CARGANDO</h1>}
		</>
	)
}

export default Characters
