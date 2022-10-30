import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListOfDataFromUrlsArr } from '../services/fetchListOfDataFromUrlsArr'
import { transformShipsArray } from '../utils/transformShipsArray'
// import { urlStringify } from '../utils/urlStringify'
// import ShipCard from './ShipCard'

const ListOfShips = ({ shipsUrls }) => {
	const [ships, setShips] = useState([])
	// const [shipSelected, setShipSelected] = useState(null)
	let navigate = useNavigate()

	useEffect(() => {
		fetchListOfDataFromUrlsArr(shipsUrls)
			.then(ships => {
				const newShips = transformShipsArray(ships)
				setShips(newShips)
			})
			.catch(console.log)
	}, [shipsUrls])

	const selectShip = useCallback(
		e => {
			const selectedValue = e.target.textContent
			// const [selectedShip] = ships.filter((ship) => ship.name === selectedValue)
			// setShipSelected(selectedShip)

			navigate(`/starships/${selectedValue.replaceAll(' ', '~')}`)
		},
		[navigate]
	)

	return (
		<>
			{ships.map(ship => (
				<span key={ship.id} onClick={selectShip} className="list-element">
					{ship.name}
				</span>
			))}
			{/* {shipSelected && <ShipCard shipSelectedData={shipSelected} />} */}
		</>
	)
}

export default ListOfShips
