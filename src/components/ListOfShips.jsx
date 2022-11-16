import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListOfDataFromUrlsArr } from '../services/fetchListOfDataFromUrlsArr'
import { transformShipsArray } from '../utils/transformShipsArray'
import { Spinner } from './Spinner'

const ListOfShips = ({ shipsUrls }) => {
  const [ships, setShips] = useState([])
  const [loading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    fetchListOfDataFromUrlsArr(shipsUrls)
      .then((ships) => {
        const newShips = transformShipsArray(ships)
        setShips(newShips)
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
  }, [shipsUrls])

  const selectShip = useCallback(
    (e) => {
      const selectedValue = e.target.textContent

      navigate(`/starships/${selectedValue.replaceAll(' ', '~')}`)
    },
    [navigate]
  )

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        ships.map((ship) => (
          <span key={ship.model} onClick={selectShip} className="list-element">
            {ship.name}
          </span>
        ))
      )}
    </>
  )
}

export default ListOfShips
