import { useParams, useLocation } from 'react-router-dom'
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

const DetailPage = () => {
  let { itemName } = useParams()
  let location = useLocation()

  let mainPath = location.pathname.slice(1).split('/')[0]
  if (mainPath === 'characters') {
    mainPath = 'people'
  }

  const { loading, elementData } = useSingleElementData({
    paramFromUrl: itemName,
    typeOfData: mainPath
  })

  // conditionally render component according to path
  const Component = lookUp[mainPath]

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
