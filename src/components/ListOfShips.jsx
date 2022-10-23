import React, { useCallback, useEffect, useState } from 'react'
import { fetchListOfDataFromUrlsArr } from '../api/fetchListOfDataFromUrlsArr'
import { transformShipsArray } from '../utils/transformShipsArray'
import ShipCard from './ShipCard'
// import PilotCard from './Pilots/PilotCard'

const ListOfShips = ({ shipsUrls }) => {
  const [ships, setShips] = useState([])
  const [shipSelected, setShipSelected] = useState(null)

  useEffect(() => {
    fetchListOfDataFromUrlsArr(shipsUrls)
      .then((ships) => {
        const newShips = transformShipsArray(ships)
        setShips(newShips)
      })
      .catch(console.log)
  }, [shipsUrls])

  const selectShip = useCallback(
    (e) => {
      const selectedValue = e.target.textContent
      const [selectedShip] = ships.filter((ship) => ship.name === selectedValue)
      setShipSelected(selectedShip)
      // e.target.scrollIntoView({ block: 'start', behavior: 'smooth' })
    },
    [ships]
  )

  return (
    <>
      {ships.map((ship) => (
        <span key={ship.id} onClick={selectShip} className="list-element">
          {ship.name}
        </span>
      ))}
      {shipSelected && <ShipCard shipSelectedData={shipSelected} />}
    </>
  )
}

export default ListOfShips
