import { useEffect } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { useFetchData } from "hooks/useFetchData";
import GridItemLinkCard from "components/GridItemLinkCard";
// import { sortObjItems } from "../utils/sortItems.js";

const Characters = () => {
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { isLoading, data, setPage } = useFetchData();
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
        {data.map((item) => (
          <GridItemLinkCard key={item.name} item={item} />
        ))}
        {isLoading && data.length > 0 && <Spinner />}
      </div>
      <div ref={fromRef}></div>
    </>
  );
};

export default Characters;
