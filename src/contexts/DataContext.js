import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTransformedDataArray } from "services/getTransformedDataArray";

export const DataContext = createContext(null);

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

  useEffect(() => {
    let myAbortController = new AbortController();
    const signal = myAbortController.signal;

    setData((prev) => ({ ...prev, isLoading: true }));

    getTransformedDataArray({
      page: currentPage,
      signal,
    })
      .then(({ transformedDataArray: newData, next }) => {
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
      .finally(() => setData((prev) => ({ ...prev, isLoading: false })));

    return () => myAbortController.abort();
    // fetch data if the user navigates or if paginates scrolling down
  }, [mainPath, currentPage]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
