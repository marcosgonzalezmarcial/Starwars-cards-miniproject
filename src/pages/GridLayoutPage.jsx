import { useEffect, useMemo } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import SearchResults from "components/SearchResults";
import { GridItems } from "components/GridItems";
import "../styles.scss";
import { useData } from "hooks/useData";

const GridLayoutPage = ({ mainPath }) => {
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const { data, setData } = useData();

  const memoizedData = useMemo(
    () => ({
      next: null,
      isLoading: false,
      planets: { data: [], page: 1 },
      starships: { data: [], page: 1 },
      characters: { data: [], page: 1 },
    }),
    // eslint-disable-next-line
    [isNearScreen]
  );

  // Only run the effect when memoized Object changes and that only changes when isNearScreen changes
  useEffect(() => {
    // stops pagination when data is loading
    if (data.isLoading) return;

    // stops pagination if next fetch is not possible
    if (!data.next) return;

    if (isNearScreen) {
      setData((prev) => ({
        ...prev,
        [mainPath]: {
          ...prev[mainPath],
          page: prev[mainPath].page + 1,
        },
      }));
    }
    // return () => setData((prev) => ({ ...prev, next: null }));
  }, [
    mainPath,
    memoizedData,
    data.isLoading,
    data.next,
    setData,
    isNearScreen,
  ]);

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
