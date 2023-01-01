import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "hooks/useSearch.js";
import useIsNearScreen from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { getTransformedDataArray } from "services/getTransformedDataArray";
import { TYPE_OF_DATA } from "../constants";
// import { sortObjItems } from "../utils/sortItems.js";

const StarShips = () => {
  const [page, setPage] = useState(0);
  const [ships, setShips] = useState([]);
  const { searchResultsItems } = useSearch();
  const [isLoading, setIsLoading] = useState(false);

  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });

  useEffect(() => {
    if (isLoading) return;
    if (isNearScreen) {
      setPage((prev) => prev + 1);
    }
  }, [isNearScreen, isLoading]);

  useEffect(() => {
    if (page === 0) return;
    if (page >= 5) return;
    setIsLoading(true);

    getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.STARSHIPS })
      .then((data) => {
        //checking data is not null
        data && setShips((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      {searchResultsItems.length > 0 ? (
        <SearchResults searchResultsItems={searchResultsItems} />
      ) : (
        <div
          className={`my-3 my-md-4 ${ships.length > 0 ? "grid-container" : ""}`}
        >
          {ships.map((ship) => (
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
