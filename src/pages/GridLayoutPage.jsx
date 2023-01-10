import { useEffect, useState, useRef, Suspense } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { useFetchData } from "hooks/useFetchData";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useLocation } from "react-router-dom";

const GridLayoutPage = () => {
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { isLoading, data, setData } = useFetchData();

  let location = useLocation();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;

    if (isNearScreen && mainPath === "planets") {
      setData((prev) => ({
        ...prev,
        planetsPagination: data.planetsPagination + 1,
      }));
    }
    if (isNearScreen && mainPath === "starships") {
      setData((prev) => ({
        ...prev,
        starshipsPagination: data.starshipsPagination + 1,
      }));
    }
    if (isNearScreen && mainPath === "people") {
      setData((prev) => ({
        ...prev,
        charactersPagination: data.charactersPagination + 1,
      }));
    }
  }, [isNearScreen, isLoading, setData]);

  if (searchResultsItems.length > 0) {
    return <SearchResults searchResultsItems={searchResultsItems} />;
  }

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
          {/* <div ref={fromRef}></div> */}
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
          {/* <div ref={fromRef}></div> */}
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
          {/* <div ref={fromRef}></div> */}
        </>
      )}
      <div ref={fromRef}></div>
    </>
  );
};

export default GridLayoutPage;

// {/* show Spinner if no data loaded yet */}
// {data?.characters?.length === 0 && <Spinner />}
// <div className="my-3 my-md-4 grid-container">
//   {data?.characters?.map((item) => (
//     <GridItemLinkCard key={item.name} item={item} />
//   ))}
//   {isLoading && data?.characters?.length > 0 && <Spinner />}
// </div>
// <div ref={fromRef}></div>
