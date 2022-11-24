import React, { useCallback, useEffect, useState } from 'react'
import { fetchListOfDataFromUrlsArr } from '../services/fetchListOfDataFromUrlsArr'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './Spinner/Spinner'

const ListOfFilms = ({ filmsUrls }) => {
  const [films, setFilms] = useState([])
  const [loading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    fetchListOfDataFromUrlsArr(filmsUrls)
      .then((films) => {
        setFilms(films)
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
      {loading ? (
        <Spinner small />
      ) : (
        films?.map((film) => (
          <span key={film?.title} onClick={selectFilm} className="list-element">
            {film.title}
          </span>
        ))
      )}
    </>
  )
}

export default ListOfFilms
