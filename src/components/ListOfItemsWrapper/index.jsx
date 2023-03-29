import { memo, useEffect } from "react";
import { useHeightObserver } from "hooks/useHeightObserver";
import ListOfItems from "components/ListOfItems";
import { useIsOverflowing } from "hooks/useIsOverflowing";
import "./ListOfItemsWrapper.scss";

function ListOfItemsWrapper({
  itemType,
  elementData,
  itemSubType,
  containerRef,
}) {
  const {
    fromRef,
    dynamicSize: { height, posY },
  } = useHeightObserver({ isLoading: false });

  const { isOverflowing } = useIsOverflowing({
    containerRef,
    elementRef: fromRef,
    height,
    posY,
  });

  const changeStyles = () => {
    //expand the max-height of the container
    containerRef.current.classList.add("expand");
  };

  // add blurred effect if is overflowing to better see the button
  useEffect(() => {
    console.log(isOverflowing);
    isOverflowing
      ? containerRef.current.style.setProperty("--min-height", "120px")
      : containerRef.current.style.setProperty("--min-height", "0");
  }, [isOverflowing, containerRef]);

  return (
    <>
      <div ref={fromRef} className="list-of-items-wrapper">
        {itemType === "films" && (
          <>
            <h3>Appearances</h3>
            <ListOfItems itemType={itemType} listOfUrls={elementData.films} />
          </>
        )}
        {itemType === "starships" && (
          <>
            <h3>Starships</h3>
            <ListOfItems
              itemType={itemType}
              listOfUrls={elementData.starships}
            />
          </>
        )}
        {itemType === "characters" && itemSubType === "pilots" && (
          <>
            <h3>Pilots</h3>
            <ListOfItems itemType={itemType} listOfUrls={elementData.pilots} />
          </>
        )}
        {itemType === "characters" && itemSubType === "residents" && (
          <>
            <h3>Residents</h3>
            <ListOfItems
              itemType={itemType}
              listOfUrls={elementData.residents}
            />
          </>
        )}
      </div>
      {isOverflowing && (
        <button
          className="view-more-btn"
          onClick={() => {
            changeStyles();
          }}
        >
          View more
        </button>
      )}
    </>
  );
}

export default memo(ListOfItemsWrapper);
