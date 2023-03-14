import ListOfItemsWrapper from 'components/ListOfItemsWrapper'

export default function Planet({ elementData }) {
  return (
    <>
      <div className="detail-page__img">
        <img src={elementData.imgUrl} alt={elementData.name} />
      </div>
      <div className="detail-page__info">
        <h1>{elementData.name}</h1>
        <div className="detail-page__info--row">
          <div>
            <h3>Terrain:</h3>
            <span>{elementData.terrain}</span>
          </div>
          <div>
            <h3>Population:</h3>
            <span>{elementData.population}</span>
          </div>
        </div>
        <div className="detail-page__info--row">
          <div>
            <h3>Diameter:</h3>
            <span>{elementData.diameter}</span>
          </div>
          <div>
            <h3>Rotation period:</h3>
            <span>{elementData.rotation_period}</span>
          </div>
        </div>
        <div className="detail-page__info--row">
          <div className="detail-page__info--row--left">
            {elementData.films?.length === 0 ? (
              <>
                <h3>Appearances</h3>
                <span>No films registered for this planet</span>
              </>
            ) : (
              <ListOfItemsWrapper itemType="films" elementData={elementData} />
            )}
          </div>
          <div>
            {elementData?.residents?.length === 0 ? (
              <>
                <h3>Residents</h3>
                <span>No residents registered for this planet</span>
              </>
            ) : (
              <ListOfItemsWrapper
                itemType="characters"
                itemSubType="residents"
                elementData={elementData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
