import { useEffect, useState } from "react";

export const useWidthObserver = ({ isLoading, mainRef }) => {
  const [dynamicSize, setDynamicSize] = useState({});

  useEffect(() => {
    if (!mainRef || isLoading) return; // wait for the elementRef to be available and loading finishes
    const resizeObserver = new ResizeObserver((entries) => {
      setDynamicSize({
        mainWidth: entries[0].contentRect.width,
      });
    });
    resizeObserver.observe(mainRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [isLoading, mainRef]);

  return {
    dynamicSize,
  };
};
