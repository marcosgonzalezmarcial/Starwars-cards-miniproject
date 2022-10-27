import React, { useCallback, useEffect, useState } from 'react'
import { fetchListOfDataFromUrlsArr } from '../api/fetchListOfDataFromUrlsArr'
import FilmCard from './FilmCard'
import './card-styles.css'
import { useNavigate } from 'react-router-dom'

const ListOfFilms = ({ filmsUrls }) => {
  const [films, setFilms] = useState([])
  // const [filmSelected, setFilmSelected] = useState(null);
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
      // const [selectedFilm] = films.filter((film) => film.title === selectFilm)
      // setFilmSelected(selectedFilm)
      // e.target.scrollIntoView({ block: 'start', behavior: 'smooth' })
      navigate(`/films/${selectFilm.replaceAll(' ', '~')}`)
    },
    [navigate]
  )

  return (
    <>
      {films.map((film, index) => (
        <span key={index} onClick={selectFilm} className="list-element">
          {film.title}
        </span>
      ))}

      {/* {filmSelected && <FilmCard filmSelectedData={filmSelected} />} */}
    </>
  )
}

export default ListOfFilms
