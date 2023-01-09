import { useEffect, useState, useRef, Suspense } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
// import { TYPE_OF_DATA } from "../constants";
import { useFetchData } from "hooks/useFetchData";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useLocation } from "react-router-dom";
import { useShips } from "hooks/useShips";
// import { sortObjItems } from "../utils/sortItems.js";

const GridLayoutPageBis = () => {
  let location = useLocation();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });

  const {
    isLoading,
    setPlanetsPage,
    setShipsPage,
    setCharactersPage,
    characters,
    planets,
    starships,
  } = useFetchData();

  const { data, setPage } = useShips({ typeOfData: mainPath });

  console.log({ data });

  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;

    if (isNearScreen) {
      if (mainPath === "planets") {
        setPlanetsPage((prev) => prev + 1);
      }
      if (mainPath === "people") {
        setCharactersPage((prev) => prev + 1);
      }
      if (mainPath === "starships") {
        setShipsPage((prev) => prev + 1);
      }
    }
  }, [
    isNearScreen,
    isLoading,
    mainPath,
    setShipsPage,
    setCharactersPage,
    setPlanetsPage,
  ]);

  if (searchResultsItems.length > 0) {
    return <SearchResults searchResultsItems={searchResultsItems} />;
  }

  return (
    <>
      {mainPath === "people" && (
        <>
          {/* show Spinner if no data loaded on first render */}
          {characters?.length === 0 && <Spinner />}
          <div className="my-3 my-md-4 grid-container">
            {characters?.map((item) => (
              <GridItemLinkCard key={item.name} item={item} />
            ))}
            {isLoading && characters.length > 0 && <Spinner />}
          </div>
          {/* <div ref={fromRef}></div> */}
        </>
      )}

      {mainPath === "planets" && (
        <>
          {/* show Spinner if no data loaded on first render */}
          {planets?.length === 0 && <Spinner />}
          <div className="my-3 my-md-4 grid-container">
            {planets?.map((item) => (
              <GridItemLinkCard key={item.name} item={item} />
            ))}
            {isLoading && planets?.length > 0 && <Spinner />}
          </div>
          {/* <div ref={fromRef}></div> */}
        </>
      )}

      {mainPath === "starships" && (
        <>
          {/* show Spinner if no data loaded on first render */}
          {starships?.length === 0 && <Spinner />}
          <div className="my-3 my-md-4 grid-container">
            {starships?.map((item) => (
              <GridItemLinkCard key={item.model} item={item} />
            ))}
            {isLoading && starships.length > 0 && <Spinner />}
          </div>
          {/* <div ref={fromRef}></div> */}
        </>
      )}
      <div ref={fromRef}></div>
    </>
  );
};

export default GridLayoutPageBis;

// import { useEffect, useState, useRef, Suspense, useCallback } from "react";
// import { useSearch } from "hooks/useSearch.js";
// import { useIsNearScreen } from "hooks/useIsNearScreen.js";
// import { Spinner } from "components/Spinner";
// import SearchResults from "components/SearchResults";
// import "../styles.scss";
// import { TYPE_OF_DATA } from "../constants";
// import { useFetchData } from "hooks/useFetchData";
// import GridItemLinkCard from "components/GridItemLinkCard";
// // import { sortObjItems } from "../utils/sortItems.js";

// const GridLayoutPage = (props) => {
//   //   const { characters, planets, starships } = props;

//   const checkProp = useCallback((props) => {
//     if (props.characters !== undefined) return props.characters;
//     if (props.planets !== undefined) return props.planets;
//     if (props.starships !== undefined) return props.starships;
//   }, []);

//   const { searchResultsItems } = useSearch();
//   const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
//   const { isLoading, data, setPage } = useFetchData({
//     typeOfData: checkProp(props),
//   });

//   useEffect(() => {
//     // stops pagination when data is loading
//     if (isLoading) return;
//     if (isNearScreen) {
//       setPage((prev) => prev + 1);
//     }
//     // return () => setData([]);
//   }, [isNearScreen, isLoading, setPage]);

//   if (searchResultsItems.length > 0) {
//     return <SearchResults searchResultsItems={searchResultsItems} />;
//   }

//   return (
//     <>
//       {/* show Spinner if no data loaded on first render */}
//       {data.length === 0 && <Spinner />}
//       <div className="my-3 my-md-4 grid-container">
//         {data.map((item) => (
//           <>
//             {props.characters && (
//               <GridItemLinkCard key={item.name} character={item} />
//             )}
//             {props.planets && (
//               <GridItemLinkCard key={item.name} planet={item} />
//             )}
//             {props.starships && (
//               <GridItemLinkCard key={item.name} ship={item} />
//             )}
//           </>
//         ))}
//         {isLoading && data.length > 0 && <Spinner />}
//       </div>
//       <div ref={fromRef}></div>
//     </>
//   );
// };

// export default GridLayoutPage;

{
  /* <>
            {mainPath === "people" && (
              <GridItemLinkCard key={item.name} character={item} />
            )}
            {mainPath === "planets" && (
              <GridItemLinkCard key={item.name} planet={item} />
            )}
            {mainPath === "starships" && (
              <GridItemLinkCard key={item.name} ship={item} />
            )}
          </> */
}
