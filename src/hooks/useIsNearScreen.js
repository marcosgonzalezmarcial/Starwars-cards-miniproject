import { useEffect, useState, useRef } from "react";

export const useIsNearScreen = ({ distance = "100px", once = true } = {}) => {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer;

    const element = fromRef.current;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsNearScreen(true);
        once && observer.disconnect();
      } else {
        !once && setIsNearScreen(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    if (element) observer.observe(element);

    return () => observer && observer.disconnect();
  }, [distance, once]);

  return { isNearScreen, fromRef };
};
