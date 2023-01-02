import { useEffect } from "react";
import { useSearch } from "hooks/useSearch.js";
import useIsNearScreen from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { TYPE_OF_DATA } from "../constants";
import { useFetchData } from "hooks/useFetchData";
import GridItemLinkCard from "components/GridItemLinkCard";
// import { sortObjItems } from "../utils/sortItems.js";

const Characters = () => {
  const { searchResultsItems } = useSearch();

  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });

  const { isLoading, data, setPage } = useFetchData({
    typeOfData: TYPE_OF_DATA.PEOPLE,
  });

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
          {data.map((character) => (
            <GridItemLinkCard key={character.name} character={character} />
          ))}
          {isLoading && <Spinner />}
        </div>
      )}
      <div ref={fromRef}></div>
    </>
  );
};

export default Characters;
