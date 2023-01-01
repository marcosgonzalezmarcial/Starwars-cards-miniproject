import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "hooks/useSearch.js";
import useIsNearScreen from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
// import { getTransformedDataArray } from "services/getTransformedDataArray";
import { TYPE_OF_DATA } from "../constants";
import { useFetchData } from "hooks/useFetchData";
// import { sortObjItems } from "../utils/sortItems.js";

const Planets = () => {
  const { searchResultsItems } = useSearch();

  const { isLoading, data, setPage } = useFetchData({
    typeOfData: TYPE_OF_DATA.PLANETS,
  });

  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  console.log("planets");

  useEffect(() => {
    if (isLoading) return;
    if (isNearScreen) {
      setPage((prev) => prev + 1);
    }
  }, [isNearScreen, isLoading, setPage]);

  return (
    <>
      {searchResultsItems.length > 0 ? (
        <SearchResults searchResultsItems={searchResultsItems} />
      ) : (
        <div
          className={`my-3 my-md-4 ${data.length > 0 ? "grid-container" : ""}`}
        >
          {data.map((planet) => (
            <Link
              className="grid-element-card"
              key={planet.name}
              to={planet.name.replaceAll(" ", "~")}
            >
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={planet.imgUrl}
                  alt={planet.name}
                />
              </div>
              <div className="text-secondary bg-dark p-3 grid-card-info">
                <h4>{planet.name}</h4>
                <p>{planet.climate}</p>
              </div>
            </Link>
          ))}
          {isLoading && <Spinner />}
        </div>
      )}
      <div ref={fromRef}></div>
    </>
  );
};

export default Planets;
