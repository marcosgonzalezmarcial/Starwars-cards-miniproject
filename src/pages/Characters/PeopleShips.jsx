import React, { useEffect, useState } from 'react'
import { fetchData } from '../../api/fetchData'

const PeopleShips = ({ person }) => {
  const [ships, setShips] = useState([])

  useEffect(() => {
    person.starships.map((url) => {
      const getShips = async () => {
        const ship = await fetchData(url)
        setShips((prev) => [...prev, ship.name])
      }
      getShips()
      return null
    })
  }, [person.starships])

  return (
    <>
      {ships.map((film, index) => (
        <div style={{ cursor: 'pointer' }} key={index}>
          <span className="people-ships-span">{film}</span>
        </div>
      ))}
    </>
  )
}

export default PeopleShips
