import { createContext, useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getTransformedDataArray } from "services/getTransformedDataArray";

export const dataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState({
    next: null,
    isLoading: false,
    planets: { data: [], page: 1 },
    starships: { data: [], page: 1 },
    characters: { data: [], page: 1 },
    films: { data: [], page: 1 },
  });

  let location = useLocation();
  let mainPath = location.pathname.slice(1).split("/")[0];
  let currentPage = data[mainPath].page;

  const memoizedData = useMemo(
    () => ({
      next: null,
      isLoading: false,
      planets: { data: [], page: 1 },
      starships: { data: [], page: 1 },
      characters: { data: [], page: 1 },
      films: { data: [], page: 1 },
    }),
    // eslint-disable-next-line
    [currentPage]
  );

  useEffect(() => {
    setData((prev) => ({ ...prev, isLoading: true }));

    getTransformedDataArray({
      page: currentPage,
    })
      .then(({ transformedDataArray: newData, next }) => {
        //checking data is not null
        newData &&
          setData((prev) => {
            return {
              ...prev,
              next,
              [mainPath]: {
                ...prev[mainPath],
                data: [
                  ...new Set(
                    [...prev[mainPath].data, ...newData].map((o) =>
                      JSON.stringify(o)
                    )
                  ),
                ].map((s) => JSON.parse(s)),
              },
            };
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setData((prev) => ({ ...prev, isLoading: false }));
      });
  }, [mainPath, memoizedData, setData, currentPage]);
  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
};
