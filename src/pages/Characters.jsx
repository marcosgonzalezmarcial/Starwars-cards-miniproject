import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { Spinner } from "../components/Spinner/Spinner";
import "../styles.scss";
import { TYPE_OF_DATA } from "../constants";
import { getTransformedDataArray } from "../services/getTransformedDataArray";
// import { sortObjItems } from "../utils/sortItems";

const Characters = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const { searchItems } = useSearch();

  useEffect(() => {
    getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.PEOPLE })
      .then((data) => {
        //checking data is not null
        data && setCharacters((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setCharacters((prev) => sortObjItems([...prev, ...data]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      {searchItems.length > 0 ? (
        <div className="my-3 my-md-4 grid-container">
          {searchItems.map((character) => (
            <div key={character.id} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={character.image}
                  alt={character.name}
                />
              </div>
              <div className="text-secondary p-3 grid-card-info bg-dark">
                <h4>{character.name}</h4>
                <p>{character.species}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={characters.length}
          next={() => setPage((prev) => characters.length < 87 && prev + 1)}
          hasMore={characters.length < 87 && true}
          loader={<Spinner />}
          className={`my-3 my-md-4 ${
            characters.length > 0 ? "grid-container" : ""
          }`}
        >
          {characters.map((character) => (
            <Link
              className="grid-element-card"
              key={character.name}
              to={character.name.replaceAll(" ", "~")}
            >
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={character.image}
                  alt={character.name}
                />
              </div>
              <div className="text-secondary p-3 grid-card-info bg-dark">
                <h4>{character.name}</h4>
                <p>{character.species}</p>
              </div>
            </Link>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Characters;
