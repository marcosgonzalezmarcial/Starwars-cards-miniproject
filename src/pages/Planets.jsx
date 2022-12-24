import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useSearch } from "hooks/useSearch.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { getTransformedDataArray } from "services/getTransformedDataArray";
import { TYPE_OF_DATA } from "../constants";
// import { sortObjItems } from "../utils/sortItems.js";

const Planets = () => {
  const [page, setPage] = useState(1);
  const [planets, setPlanets] = useState([]);
  const { searchResultsItems } = useSearch();

  useEffect(() => {
    getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.PLANETS })
      .then((data) => {
        //checking data is not null

        data && setPlanets((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
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
        <InfiniteScroll
          dataLength={planets.length}
          next={() => setPage((prev) => planets.length < 59 && prev + 1)}
          hasMore={planets.length < 59 && true}
          loader={<Spinner />}
          className={`my-3 my-md-4 ${
            planets.length > 0 ? "grid-container" : ""
          }`}
        >
          {planets.map((planet) => (
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
        </InfiniteScroll>
      )}
    </>
  );
};

export default Planets;
