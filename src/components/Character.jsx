import ListOfItemsContainer from "components/ListOfItemsContainer";
import { Link } from "react-router-dom";

function PlanetLink({ name }) {
  if (typeof name === "string") {
    return <Link to={`/planets/${name.replaceAll(" ", "~")}`} className="list-item">{name}</Link>;
  } else {
    return name?.map((planet) => (
      <Link to={`/planets/${planet.replaceAll(" ", "~")}`} className="list-item">{planet}</Link>
    ));
  }
}

export default function Character({ elementData, containerRef }) {

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
            <div>
              <PlanetLink
                name={elementData?.homeworld}
              />
              {/* <PlanetLink
                name={`${elementData?.homeworld
                  ?.charAt(0)
                  .toUpperCase()}${elementData.homeworld?.substring(1)}`}
              /> */}
            </div>
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
              <ListOfItemsContainer
                itemType="films"
                containerRef={containerRef}
                elementData={elementData}
              />
            )}
          </div>
          <div>
            {elementData.starships?.length === 0 ? (
              <>
                <h3>Starships</h3>
                <span>No starships registered for this character</span>
              </>
            ) : (
              <ListOfItemsContainer
                itemType="starships"
                elementData={elementData}
                containerRef={containerRef}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
