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

const Characters = () => {
  const [page, setPage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const { searchResultsItems } = useSearch();
  const [isLoading, setIsLoading] = useState(false)

  const { isNearScreen, fromRef } = useIsNearScreen({ once: false })

  useEffect(() => {
    if (isLoading) return
    if (isNearScreen) {
      setPage((prev) => prev + 1)
    }
  }, [isNearScreen])

  useEffect(() => {
    if (page === 0) return
    if (page >= 10) return
    setIsLoading(true)

    getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.PEOPLE })
      .then((data) => {
        //checking data is not null
        data && setCharacters((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);



  return (
    <>
      {searchResultsItems.length > 0 ? (
        <SearchResults searchResultsItems={searchResultsItems} />
      ) :
        (
          <div
            className={`my-3 my-md-4 ${characters.length > 0 ? "grid-container" : ""
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
            {isLoading && <Spinner />}
          </div>
        )

      }
      <div ref={fromRef}></div>
    </>
  );
};

export default Characters;
