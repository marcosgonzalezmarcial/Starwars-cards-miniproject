import { useParams } from 'react-router-dom'
import Character from 'components/Character'
import Starship from 'components/Starship'
import Planet from 'components/Planet'
import Film from 'components/Film'
import { Spinner } from 'components/Spinner'
import { useSingleElementData } from 'hooks/useSingleElementData'
import './DetailPage.scss'
import { useRef } from 'react'

const lookUp = {
  starships: Starship,
  people: Character,
  planets: Planet,
  films: Film
}

export default function DetailPage({ currentPath }) {
  let { itemName } = useParams()

  let fromRef = useRef()

  if (currentPath === 'characters') {
    currentPath = 'people'
  }

  const { loading, elementData } = useSingleElementData({
    paramFromUrl: itemName,
    typeOfData: currentPath
  })

  // conditionally render component according to current path
  const Component = lookUp[currentPath]

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main ref={fromRef} className="detail-page">
          <Component containerRef={fromRef} elementData={elementData} />
        </main>
      )}
    </>
  )
}
