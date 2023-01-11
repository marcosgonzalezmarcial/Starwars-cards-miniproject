import { useEffect } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import { GridItems } from "components/GridItems";
import "../styles.scss";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useData } from "hooks/useData";

const GridLayoutPage = ({ mainPath }) => {
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { isLoading, data, setData } = useData();
  console.log("render");

  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;

    // check if isNearScreen and mainPath to update correct data
    if (isNearScreen) {
      switch (mainPath) {
        case "planets":
          setData((prev) => ({
            ...prev,
            planetsPagination: data.planetsPagination + 1,
          }));
          break;
        case "starships":
          setData((prev) => ({
            ...prev,
            starshipsPagination: data.starshipsPagination + 1,
          }));
          break;
        case "people":
          setData((prev) => ({
            ...prev,
            charactersPagination: data.charactersPagination + 1,
          }));
          break;
        default:
          console.log("no valid route found");
      }
    }
  }, [isNearScreen, isLoading, setData]);

  if (searchResultsItems.length > 0) {
    return <SearchResults searchResultsItems={searchResultsItems} />;
  }

  return (
    <>
      <GridItems mainPath={mainPath} />
      <div ref={fromRef}></div>
    </>
  );
};

export default GridLayoutPage;
