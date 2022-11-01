import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListOfDataFromUrlsArr } from '../services/fetchListOfDataFromUrlsArr'
import { transformPeopleArray } from '../utils/transformPeopleArray'

const ListOfPilots = ({ pilotsUrls }) => {
	const [pilots, setPilots] = useState([])
	let navigate = useNavigate()

	useEffect(() => {
		fetchListOfDataFromUrlsArr(pilotsUrls)
			.then(pilots => {
				const newPilots = transformPeopleArray(pilots)
				setPilots(newPilots)
			})
			.catch(console.log)
	}, [pilotsUrls])

	const selectPilot = useCallback(
		e => {
			const selectedValue = e.target.textContent

			navigate(`/characters/${selectedValue.replaceAll(' ', '~')}`)
		},
		[navigate]
	)

	return (
		<>
			{pilots.map(pilot => (
				<span key={pilot.id} onClick={selectPilot} className="list-element">
					{pilot.name}
				</span>
			))}
		</>
	)
}

export default ListOfPilots
