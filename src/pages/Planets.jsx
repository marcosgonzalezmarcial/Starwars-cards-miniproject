import { useEffect, useState, useRef, Suspense } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { TYPE_OF_DATA } from "../constants";
import { useFetchData } from "hooks/useFetchData";
import GridItemLinkCard from "components/GridItemLinkCard";
// import { sortObjItems } from "../utils/sortItems.js";

const Planets = () => {
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { isLoading, data, setPage } = useFetchData({
    typeOfData: TYPE_OF_DATA.PLANETS,
  });
  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;
    if (isNearScreen) {
      setPage((prev) => prev + 1);
    }
  }, [isNearScreen, isLoading, setPage]);

  if (searchResultsItems.length > 0) {
    return <SearchResults searchResultsItems={searchResultsItems} />;
  }

  return (
    <>
      {/* show Spinner if no date loaded yet */}
      {data.length === 0 && <Spinner />}
      <div className="my-3 my-md-4 grid-container">
        {data.map((planet) => (
          <GridItemLinkCard key={planet.name} planet={planet} />
        ))}
        {isLoading && data.length > 0 && <Spinner />}
      </div>
      <div ref={fromRef}></div>
    </>
  );
};

export default Planets;
