import React, { useCallback, useEffect, useState } from 'react'
import { fetchListOfDataFromUrlsArr } from '../api/fetchListOfDataFromUrlsArr'
import FilmCard from './FilmCard'
import './card-styles.css'

const ListOfFilms = ({ filmsUrls }) => {
	const [films, setFilms] = useState([])
	const [filmSelected, setFilmSelected] = useState(null)

	useEffect(() => {
		fetchListOfDataFromUrlsArr(filmsUrls)
			.then(films => {
				setFilms(films)
			})
			.catch(console.log)
	}, [filmsUrls])

	const selectFilm = useCallback(
		e => {
			const selectFilm = e.target.textContent
			const [selectedFilm] = films.filter(film => film.title === selectFilm)
			setFilmSelected(selectedFilm)
			e.target.scrollIntoView({ block: 'start', behavior: 'smooth' })
		},
		[films]
	)

	return (
		<>
			{films.map((film, index) => (
				<div style={{ cursor: 'pointer' }} key={index}>
					<span onClick={selectFilm} className="films-span">
						{film.title}
					</span>
				</div>
			))}
			{filmSelected && <FilmCard filmSelectedData={filmSelected} />}
		</>
	)
}

export default ListOfFilms
