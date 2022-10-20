import { useState, useEffect } from 'react'
import { fetchCharacters } from '../../api/fetchCharacters'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import peopleJsonArr from '../../api/mocked-data/peopleMappedData.json'
import { transformPeopleArray } from '../../utils/transformPeopleArray'
import './Characters.css'
import { getTransformedCharactersArray } from '../../api/getTransformedCharactersArray'

const Characters = () => {
	const [page, setPage] = useState(1)
	const [characters, setCharacters] = useState([])

	let navigate = useNavigate()

	useEffect(() => {
		getTransformedCharactersArray(page).then(data =>
			setCharacters(prev => [...prev, ...data])
		)
	}, [page])

	const handleClick = e => {
		const personSelected = e.target.textContent
		const [person] = peopleJsonArr.filter(item => item.name === personSelected)
		navigate(`/people/${person.id}`)
	}

	return (
		<>
			<InfiniteScroll
				dataLength={characters.length}
				next={() => setPage(prev => characters.length < 82 && prev + 1)}
				hasMore={characters.length < 82 && true}
				loader={
					<div className="m-3">
						<div className="text-white display-4">Cargando...</div>
					</div>
				}
			>
				<div className="my-3 my-md-5 peopleGrid">
					{characters.map(character => (
						<div key={character.id} className="people-card">
							<div className="card-hero">
								<img
									className="card-hero-img"
									src={character.image}
									alt="starship"
								/>
							</div>
							<div className="text-secondary bg-dark p-3 card-info">
								<h4 className="card-ship-title" onClick={handleClick}>
									{character.name}
								</h4>
								<p>{character.species}</p>
							</div>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</>
	)
}

export default Characters
