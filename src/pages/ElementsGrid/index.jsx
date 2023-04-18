import { useEffect } from "react";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import { useData } from "hooks/useData";
import { BackToTopBtn } from "components/BackToTopBtn";
import { Spinner } from "components/Spinner";
import ItemsList from "./ItemsList";
import "./ElementsGrid.scss";

export default function ElementsGrid({ currentPath }) {
  const { isNearScreen, fromRef } = useIsNearScreen();
  const { data, dispatch } = useData();

  const next = data[currentPath].next;
  const isLoading = data.isLoading;
  const currentData = data[currentPath].data;

  // scroll down pagination
  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;
    // stops pagination if there is no more elements because data.next is null
    if (next === null) return;

    if (isNearScreen) {
      dispatch({ type: "NEXT_PAGE", payload: { currentPath } });
    }
  }, [isNearScreen, dispatch, currentPath, isLoading, next]);

  return (
    <>
      {/* show Spinner if no data loaded yet */}
      {currentData.length === 0 && <Spinner />}
      <main className="grid-items">
        {/* <Suspense fallback={<Spinner />}> */}
        <ItemsList currentData={currentData} isLoading={isLoading} />
        {/* </Suspense> */}
      </main>
      {/* is near screen view finder */}
      <div ref={fromRef}></div>
      <BackToTopBtn />
    </>
  );
}

//TODO: If I wrap the component in Suspense onlt loads the Spinner the first time it navigates because a loading state is missing
