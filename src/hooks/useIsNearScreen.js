import { useEffect, useState, useRef } from "react";

export const useIsNearScreen = ({ distance = "100px" } = {}) => {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer;

    const element = fromRef.current;

    const onChange = (entries) => {
      const el = entries[0];
      el.isIntersecting ? setIsNearScreen(true) : setIsNearScreen(false);
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    if (element) observer.observe(element);

    return () => observer && observer.disconnect();
  }, [distance]);

  return { isNearScreen, fromRef };
};
