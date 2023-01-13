import { useEffect, useMemo } from "react";
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
  const { data, setData } = useData();

  const memoizedData = useMemo(
    () => ({
      next: null,
      isLoading: false,
      planets: { data: [], page: 1 },
      starships: { data: [], page: 1 },
      characters: { data: [], page: 1 },
    }),
    [isNearScreen]
  );

  useEffect(() => {
    // stops pagination when data is loading
    if (data.isLoading) return;
    if (data.starships.page >= 5 || data.next === undefined) {
      setData((prev) => ({ ...prev, isLoading: false }));
      return;
    }
    if (isNearScreen) {
      setData((prev) => ({
        ...prev,
        [mainPath]: {
          ...data[mainPath],
          page: data[mainPath].page + 1,
        },
      }));
    }
  }, [memoizedData]);

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
