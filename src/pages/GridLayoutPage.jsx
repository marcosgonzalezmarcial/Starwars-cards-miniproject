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

const GridLayoutPage = (props) => {
  //   const { characters, planets, starships } = props;

  const checkProp = (props) => {
    // const { characters, planets, starships } = props;

    if (props.characters !== undefined) return props.characters;
    if (props.planets !== undefined) return props.planets;
    if (props.starships !== undefined) return props.starships;
  };
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { isLoading, data, setPage } = useFetchData({
    typeOfData: checkProp(props),
  });

  console.log(data);
  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;
    if (isNearScreen) {
      setPage((prev) => prev + 1);
    }
    return setPage(1);
  }, [isNearScreen, isLoading, setPage]);

  if (searchResultsItems.length > 0) {
    return <SearchResults searchResultsItems={searchResultsItems} />;
  }

  return (
    <>
      {/* show Spinner if no data loaded on first render */}
      {data.length === 0 && <Spinner />}
      <div className="my-3 my-md-4 grid-container">
        {data.map((item) => (
          <>
            {/* {console.log(item)} */}
            {props.characters && (
              <GridItemLinkCard key={item.name} character={item} />
            )}
            {props.planets && (
              <GridItemLinkCard key={item.name} planet={item} />
            )}
            {props.starships && (
              <GridItemLinkCard key={item.name} ship={item} />
            )}
            {/* <GridItemLinkCard key={item.id} character={character} /> */}
          </>
        ))}
        {isLoading && data.length > 0 && <Spinner />}
      </div>
      <div ref={fromRef}></div>
    </>
  );
};

export default GridLayoutPage;
