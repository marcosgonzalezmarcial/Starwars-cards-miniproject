import ListOfItemsWrapper from "components/ListOfItemsWrapper";

const Starship = ({ elementData }) => {
  return (
    <>
      <div className="detail-page__img">
        <img src={elementData.imgUrl} alt={elementData.name} />
      </div>
      <div className="detail-page__info">
        <h1>{elementData.name}</h1>
        <div className="detail-page__info--row">
          <div>
            <h3>Model:</h3>
            <span>{elementData.model}</span>
          </div>
          <div>
            <h3>Length:</h3>
            <span>{elementData.length ? elementData.length : "Unknown"}</span>
          </div>
        </div>
        <div className="detail-page__info--row">
          <div>
            <h3>Atmospheric speed:</h3>
            <span>{elementData.max_atmosphering_speed}</span>
          </div>
          <div>
            <h3>Crew:</h3>
            <span>{elementData.crew}</span>
          </div>
        </div>
        <div className="detail-page__info--row">
          <div >
            {elementData?.films?.length === 0 ? (
              <>
                <h3>Appearances</h3>
                <span>No films registered for this character</span>
              </>
            ) : (
              <ListOfItemsWrapper
                itemType="films"
                elementData={elementData}
              />
            )}
          </div>
          <div>
            {elementData.pilots?.length === 0 ? (
              <>
                <h3>Pilots</h3>
                <span>No pilots registered for this ship</span>
              </>
            ) : (
              <ListOfItemsWrapper
                itemType="characters"
                itemSubType="pilots"
                elementData={elementData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Starship;
