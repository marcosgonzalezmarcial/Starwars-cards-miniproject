import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "hooks/useSearch.js";
import useIsNearScreen from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import { TYPE_OF_DATA } from "../constants";
import { useFetchData } from "hooks/useFetchData";
// import { sortObjItems } from "../utils/sortItems.js";
import "../styles.scss";

const StarShips = () => {
  const { searchResultsItems } = useSearch();

  const { isLoading, data, setPage } = useFetchData({
    typeOfData: TYPE_OF_DATA.STARSHIPS,
  });

  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });

  console.log("starships");

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
          {data.map((ship) => (
            <Link
              className="grid-element-card"
              key={`${ship.model}${ship.crew}`}
              to={`${ship.name.replaceAll(" ", "~")}`}
            >
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={ship.imgUrl}
                  alt={ship.name}
                />
              </div>
              <div className="text-secondary bg-dark p-3 grid-card-info">
                <h4>{ship.name}</h4>
                <p>{ship.model}</p>
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

export default StarShips;
