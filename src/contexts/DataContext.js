import { createContext, useEffect, useMemo, useReducer, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getTransformedData } from "services/getTransformedData";
import { dataReducer, DATA_ACTIONS } from "reducers/dataReducer";

const initialAppData = {
  isLoading: false,
  planets: { data: [], page: 1, next: null },
  starships: { data: [], page: 1, next: null },
  characters: { data: [], page: 1, next: null },
  films: { data: [], page: 1 },
};

export const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialAppData);

  const location = useLocation();
  const elementType = location.pathname.slice(1).split("/")[0];
  const currentPage = data[elementType]?.page;

  const cachedRefData = useRef(data);

  // fetch data if the user navigates or if paginates scrolling down
  useEffect(() => {
    if (elementType === "search") return;
    const cachedData = cachedRefData.current;
    const previousPageFromCached = cachedData[elementType]?.page;
    const cachedElementTypeData = cachedData[elementType]?.data;

    // Updating data cached in ref
    cachedRefData.current = {
      ...data,
    };

    /* check if there is cached element data and then compare current vs previus page to avoids re fetchings  */
    if (
      cachedElementTypeData?.length > 0 &&
      previousPageFromCached === currentPage
    )
      return;

    /* Fetch data  after checking cached data */
    //create abort controller to stop requests when component unmounts
    let myAbortController = new AbortController();
    const signal = myAbortController.signal;

    dispatch({ type: DATA_ACTIONS.START_LOADING });
    getTransformedData({
      page: currentPage,
      elementType,
      signal,
    })
      .then(({ transformedDataArray: newData, next }) => {
        newData &&
          dispatch({
            type: DATA_ACTIONS.GET_DATA_BY_PATH,
            payload: { newData, next, elementType },
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch({ type: DATA_ACTIONS.FINISH_LOADING }));

    return () => {
      myAbortController.abort();
    };
    // eslint-disable-next-line
  }, [elementType, currentPage]);

  // momoized value to avoid re renders
  const value = useMemo(() => ({ data, dispatch }), [data, dispatch]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
