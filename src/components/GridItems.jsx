import { Spinner } from "components/Spinner";
import GridItemLinkCard from "components/GridItemLinkCard";

export const GridItems = ({ data, mainPath, isLoading }) => {
  return (
    <>
      {mainPath === "people" && (
        <>
          {/* show Spinner if no data loaded yet */}
          {data?.characters?.length === 0 && <Spinner />}
          <div className="my-3 my-md-4 grid-container">
            {data?.characters?.map((item) => (
              <GridItemLinkCard key={item.name} item={item} />
            ))}
            {isLoading && data.characters.length > 0 && <Spinner />}
          </div>
        </>
      )}
      {mainPath === "planets" && (
        <>
          {/* show Spinner if no data loaded yet */}
          {data.planets.length === 0 && <Spinner />}
          <div className="my-3 my-md-4 grid-container">
            {data.planets.map((item) => (
              <GridItemLinkCard key={item.name} item={item} />
            ))}
            {isLoading && data.planets.length > 0 && <Spinner />}
          </div>
        </>
      )}
      {mainPath === "starships" && (
        <>
          {/* show Spinner if no data loaded yet */}
          {data?.starships?.length === 0 && <Spinner />}
          <div className="my-3 my-md-4 grid-container">
            {data?.starships?.map((item) => (
              <GridItemLinkCard key={item.name} item={item} />
            ))}
            {isLoading && data.starships.length > 0 && <Spinner />}
          </div>
        </>
      )}
    </>
  );
};
