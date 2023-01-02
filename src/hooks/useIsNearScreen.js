import { useEffect, useState, useRef } from "react";

export default function useIsNearScreen({
  distance = "100px",
  once = true,
} = {}) {
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

    // Promise.resolve(
    //   typeof IntersectionObserver !== 'undefined'
    //     ? IntersectionObserver
    //     : import('intersection-observer')
    // ).then(() => {
    //   observer = new IntersectionObserver(onChange, {
    //     rootMargin: distance
    //   })})
    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    if (element) observer.observe(element);

    return () => observer && observer.disconnect();
  }, [distance, once]);

  return { isNearScreen, fromRef };
}

// import { useEffect, useState } from "react";
// import { TYPE_OF_DATA } from "../constants";
// import { getTransformedDataArray } from "../services/getTransformedDataArray";

// export const useIsNearScreen = ({ listOfUrls }) => {
//   // const [loading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.PLANETS })
//       .then((data) => {
//         //checking data is not null

//         data && setData((prev) => [...prev, ...data]);
//         // sorting items may be applied in future iterations
//         // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [page]);

//   return {
//     // loading
//     data,
//   };
// };
