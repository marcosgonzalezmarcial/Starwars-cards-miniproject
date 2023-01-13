import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getTransformedDataArray } from "services/getTransformedDataArray";
import { getPathname } from "utils/getPathname";

export const dataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState({
    next: null,
    isLoading: false,
    planets: { data: [], page: 1 },
    starships: { data: [], page: 1 },
    characters: { data: [], page: 1 },
  });

  let location = useLocation();
  let mainPath = location.pathname.slice(1);

  console.log(data);

  const memoizedData = useMemo(
    () => ({
      next: null,
      isLoading: false,
      planets: { data: [], page: 1 },
      starships: { data: [], page: 1 },
      characters: { data: [], page: 1 },
    }),
    [data[mainPath].page]
  );

  useEffect(() => {
    // setIsLoading(true);
    setData((prev) => ({ ...prev, isLoading: true }));
    if (data.starships.page >= 5 || data.next === undefined) {
      console.log(data.next);
      // setIsLoading(false);
      setData((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    // if (mainPath === "starships") {

    // no items above pag 5
    // if (data.starshipsPagination >= 5) {
    //   setIsLoading(false);
    //   return;
    // }
    let newPath;
    if (mainPath === "characters") {
      newPath = "people";
      getTransformedDataArray({
        // page: data.starshipsPagination,
        page: data[mainPath].page,
        typeOfData: newPath,
      })
        .then(({ transformedDataArray: newData, next }) => {
          //checking data is not null
          newData &&
            setData((prev) => ({
              ...prev,
              next,
              [mainPath]: {
                ...data[mainPath],
                data: [
                  ...new Set(
                    [...data[mainPath].data, ...newData].map((o) =>
                      JSON.stringify(o)
                    )
                  ),
                ].map((s) => JSON.parse(s)),
              },
            }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setData((prev) => ({ ...prev, isLoading: false }));
        });
      return;
    }

    getTransformedDataArray({
      // page: data.starshipsPagination,
      page: data[mainPath].page,
      typeOfData: mainPath,
    })
      .then(({ transformedDataArray: newData, next }) => {
        //checking data is not null
        newData &&
          setData((prev) => ({
            ...prev,
            next,
            [mainPath]: {
              ...data[mainPath],
              data: [
                ...new Set(
                  [...data[mainPath].data, ...newData].map((o) =>
                    JSON.stringify(o)
                  )
                ),
              ].map((s) => JSON.parse(s)),
            },
          }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setData((prev) => ({ ...prev, isLoading: false }));
      });
  }, [mainPath, memoizedData]);
  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
};
