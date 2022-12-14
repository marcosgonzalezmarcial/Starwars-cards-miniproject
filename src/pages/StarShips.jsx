import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { Spinner } from "../components/Spinner/Spinner";
import SearchResults from "../components/SearchResults";
import "../styles.scss";
import { getTransformedDataArray } from "../services/getTransformedDataArray";
import { TYPE_OF_DATA } from "../constants";
// import { sortObjItems } from "../utils/sortItems";

const StarShips = () => {
  const [page, setPage] = useState(1);
  const [ships, setShips] = useState([]);
  const { searchResultsItems } = useSearch();

  useEffect(() => {
    getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.STARSHIPS })
      .then((data) => {
        //checking data is not null
        data && setShips((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setShips((prev) => sortObjItems([...prev, ...data]));
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
          dataLength={ships.length}
          next={() => setPage((prev) => ships.length < 36 && prev + 1)}
          hasMore={ships.length < 36 && true}
          loader={<Spinner />}
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
        </InfiniteScroll>
      )}
    </>
  );
};

export default StarShips;
