import React, { useCallback, useEffect, useState } from 'react'
import { fetchListOfDataFromUrlsArr } from '../api/fetchListOfDataFromUrlsArr'
import { transformPeopleArray } from '../utils/transformPeopleArray'
import PilotCard from './PilotCard'

const ListOfPilots = ({ pilotsUrls }) => {
	const [pilots, setPilots] = useState([])
	const [pilotSelected, setPilotSelected] = useState(null)

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
			const [selectedPilot] = pilots.filter(
				pilot => pilot.name === selectedValue
			)
			setPilotSelected(selectedPilot)
			// e.target.scrollIntoView({ block: 'start', behavior: 'smooth' })
		},
		[pilots]
	)

	return (
		<>
			{pilots.map((pilot, index) => (
				<div style={{ cursor: 'pointer' }} key={index}>
					<span onClick={selectPilot} className="films-span">
						{pilot.name}
					</span>
				</div>
			))}
			{pilotSelected && <PilotCard pilotSelectedData={pilotSelected} />}
		</>
	)
}

export default ListOfPilots
