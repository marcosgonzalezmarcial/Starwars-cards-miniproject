import ListOfItemsWrapper from 'components/ListOfItemsWrapper'
import { useNavigate } from 'react-router-dom'

const Character = ({ elementData }) => {
  let navigate = useNavigate()
  const handleItemClick = (e) => {
    const planetSelected = e.target.textContent
    navigate(`/planets/${planetSelected}`)
  }

  return (
    <>
      <div className="detail-page__img">
        <picture>
          <source media="(max-width: 576px)" srcSet={elementData.img_small} />
          <source media="(min-width: 577px)" srcSet={elementData.image} />
          <img src={elementData.image} alt={elementData.name} />
        </picture>
      </div>
      <div className="detail-page__info">
        <h1>{elementData.name}</h1>
        <div className="detail-page__info--row">
          <div>
            <h3>Height:</h3>
            <span>{elementData.height}</span>
          </div>
          <div>
            <h3>Birth Year</h3>
            <span>{elementData.birth_year}</span>
          </div>
        </div>
        <div className="detail-page__info--row">
          <div>
            <h3>Species</h3>
            <span>{elementData.species}</span>
          </div>
          <div>
            <h3>Homeworld</h3>
            <span className="list-of-items" onClick={handleItemClick}>
              {Array.isArray(elementData.homeworld)
                ? `${elementData.homeworld[0]
                    .toUpperCase()
                    .at(0)}${elementData.homeworld[0].substring(1)}`
                : null}
            </span>
          </div>
        </div>
        <div className="detail-page__info--row">
          <div>
            {elementData.films?.length === 0 ? (
              <>
                <h3>Appearances</h3>
                <span>No films registered for this character</span>
              </>
            ) : (
              <ListOfItemsWrapper itemType="films" elementData={elementData} />
            )}
          </div>
          <div>
            {elementData.starships?.length === 0 ? (
              <>
                <h3>Starships</h3>
                <span>No starships registered for this character</span>
              </>
            ) : (
              <ListOfItemsWrapper
                itemType="starships"
                elementData={elementData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Character
