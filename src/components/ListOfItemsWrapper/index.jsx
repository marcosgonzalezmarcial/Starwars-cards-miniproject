import { memo, useEffect } from "react";
import { useHeightObserver } from "hooks/useHeightObserver";
import ListOfItems from "components/ListOfItems";
import { useIsOverflowing } from "hooks/useIsOverflowing";
import "./ListOfItemsWrapper.scss";


function Element({ title, itemType, elementData }) {
  return (
    <>
      <h3>{title}</h3>
      <ListOfItems itemType={itemType} listOfUrls={elementData[itemType]} />
    </>
  );
};


function ListOfItemsWrapper({
  itemType,
  elementData,
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


  const expandContainer = () => {
    //expand the max-height of the container
    containerRef.current.classList.add("expand");
  };

  // add blurred effect if is overflowing to see the button
  useEffect(() => {
    isOverflowing
      ? containerRef.current.style.setProperty("--min-height", "120px")
      : containerRef.current.style.setProperty("--min-height", "0");
  }, [isOverflowing, containerRef]);


  return (
    <>
      <div ref={fromRef} className="list-of-items-wrapper">
        <Element title={`${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`} elementData={elementData} itemType={itemType} />
      </div>
      {isOverflowing && (
        <button
          className="view-more-btn"
          onClick={() => {
            expandContainer();
          }}
        >
          View more
        </button>
      )}
    </>
  );
}

export default memo(ListOfItemsWrapper);
