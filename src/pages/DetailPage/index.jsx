import { useParams } from 'react-router-dom'
import Character from 'components/Character'
import Starship from 'components/Starship'
import Planet from 'components/Planet'
import Film from 'components/Film'
import { Spinner } from 'components/Spinner'
import { useSingleElementData } from 'hooks/useSingleElementData'
import './DetailPage.scss'

const lookUp = {
  starships: Starship,
  people: Character,
  planets: Planet,
  films: Film
}

const DetailPage = ({ currentPath }) => {
  let { itemName } = useParams()

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
        <main className="detail-page">
          <Component elementData={elementData} />
        </main>
      )}
    </>
  )
}

export default DetailPage
