import ListOfItemsWrapper from 'components/ListOfItemsWrapper'

const Film = ({ elementData, containerRef }) => {
  return (
    <>
      <div className="detail-page__img">
        <picture>
          <source media="(max-width: 575px)" srcSet={elementData.image_small} />
          <source media="(min-width: 576px)" srcSet={elementData.imgUrl} />
          <img src={elementData.imgUrl} alt={elementData.title} />
        </picture>
      </div>
      <div className="detail-page__info">
        <h1>{elementData.title}</h1>
        <div className="detail-page__info--row">
          <div>
            <h3>Episode:</h3>
            <span>{elementData.episode_id}</span>
          </div>
          <div>
            <h3>Director</h3>
            <span>{elementData.director}</span>
          </div>
        </div>
        <div className="detail-page__info--row">
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
                containerRef={containerRef}
              />
            )}
          </div>
          <div>
            <h3>Release date</h3>
            <span>{elementData.release_date}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Film
