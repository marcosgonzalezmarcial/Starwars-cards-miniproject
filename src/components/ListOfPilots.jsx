import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListOfDataFromUrlsArr } from '../services/fetchListOfDataFromUrlsArr'
import { transformPeopleArray } from '../utils/transformPeopleArray'
import { Spinner } from './Spinner'

const ListOfPilots = ({ pilotsUrls }) => {
  const [pilots, setPilots] = useState([])
  const [loading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    fetchListOfDataFromUrlsArr(pilotsUrls)
      .then((pilots) => {
        const newPilots = transformPeopleArray(pilots)
        setPilots(newPilots)
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
  }, [pilotsUrls])

  const selectPilot = useCallback(
    (e) => {
      const selectedValue = e.target.textContent

      navigate(`/characters/${selectedValue.replaceAll(' ', '~')}`)
    },
    [navigate]
  )

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        pilots.map((pilot) => (
          <span key={pilot.id} onClick={selectPilot} className="list-element">
            {pilot.name}
          </span>
        ))
      )}
    </>
  )
}

export default ListOfPilots
