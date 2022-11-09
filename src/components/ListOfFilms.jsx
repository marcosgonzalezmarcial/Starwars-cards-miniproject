import React, { useCallback, useEffect, useState } from 'react'
import { fetchListOfDataFromUrlsArr } from '../services/fetchListOfDataFromUrlsArr'
import FilmCard from './FilmCard'
import './card-styles.css'
import { useNavigate } from 'react-router-dom'

const ListOfFilms = ({ filmsUrls }) => {
  const [films, setFilms] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    fetchListOfDataFromUrlsArr(filmsUrls)
      .then((films) => {
        setFilms(films)
      })
      .catch(console.log)
  }, [filmsUrls])

  const selectFilm = useCallback(
    (e) => {
      const selectFilm = e.target.textContent
      navigate(`/films/${selectFilm.replaceAll(' ', '~')}`)
    },
    [navigate]
  )

  return (
    <>
      {films.map((film) => (
        <span key={film?.title} onClick={selectFilm} className="list-element">
          {film.title}
        </span>
      ))}
    </>
  )
}

export default ListOfFilms
