import { useEffect, useState, useRef, Suspense } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
// import { TYPE_OF_DATA } from "../constants";
import { useFetchData } from "hooks/useFetchData";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useLocation, useParams } from "react-router-dom";
// import { sortObjItems } from "../utils/sortItems.js";

const GridLayoutPage = () => {
  let location = useLocation();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { isLoading, planets, starships, setPage, characters } = useFetchData();

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
      {mainPath === "planets" && planets.length === 0 && <Spinner />}
      {mainPath === "planets" && (
        <div className="my-3 my-md-4 grid-container">
          {planets.map((item) => (
            <GridItemLinkCard key={item.name} item={item} />
          ))}

          {isLoading && planets.length > 0 && <Spinner />}
        </div>
      )}
      {mainPath === "starships" && starships.length === 0 && <Spinner />}
      {mainPath === "starships" && (
        <div className="my-3 my-md-4 grid-container">
          {starships.map((item) => (
            <GridItemLinkCard key={item.name} item={item} />
          ))}

          {isLoading && starships.length > 0 && <Spinner />}
        </div>
      )}
      {mainPath === "people" && characters.length === 0 && <Spinner />}
      {mainPath === "people" && (
        <div className="my-3 my-md-4 grid-container">
          {characters.map((item) => (
            <GridItemLinkCard key={item.name} item={item} />
          ))}

          {isLoading && characters.length > 0 && <Spinner />}
        </div>
      )}

      <div ref={fromRef}></div>
    </>
  );
};

export default GridLayoutPage;

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
