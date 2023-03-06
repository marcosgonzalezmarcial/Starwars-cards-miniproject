import { createContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getTransformedDataArray } from 'services/getTransformedDataArray'
import { dataReducer, DATA_ACTIONS } from 'reducers/dataReducer'

const initialData = {
  isLoading: false,
  planets: { data: [], page: 1, next: null },
  starships: { data: [], page: 1, next: null },
  characters: { data: [], page: 1, next: null },
  films: { data: [], page: 1 }
}

export const DataContext = createContext(null)

export const DataContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialData)

  const location = useLocation()
  const mainPath = location.pathname.slice(1).split('/')[0]
  const currentPage = data[mainPath].page

  const cachedRefData = useRef(data)

  // // NEW WORKING VERSION
  useEffect(() => {
    let cachedData = cachedRefData.current
    // Caching data in a ref but keep the previous page count to compare and avoid re fetchings
    cachedRefData.current = {
      ...data,
      [mainPath]: {
        ...data[mainPath],
        page: cachedData[mainPath].page
      }
    }
  }, [data, mainPath])
  // fetch data if the user navigates or if paginates scrolling down
  useEffect(() => {
    let cachedData = cachedRefData.current
    // check if is any cached data in cachedData ref
    if (cachedData[mainPath]?.data?.length > 0) {
      // avoids re fetchings comparing current page and previus page
      if (cachedData[mainPath]?.page === currentPage) {
        // checks if next property in cached ref is truethy to keep fetching data
        if (Boolean(cachedData[mainPath]?.next)) return
        return
      }
    }
    // Fetch data  after cheking cahced data
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    dispatch({ type: DATA_ACTIONS.START_LOADING })
    getTransformedDataArray({
      page: currentPage,
      mainPath,
      signal
    })
      .then(
        ({ transformedDataArray: newData, next }) =>
          newData &&
          dispatch({
            type: DATA_ACTIONS.GET_DATA_BY_PATH,
            payload: { newData, next, mainPath }
          })
      )
      .catch((error) => {
        console.log(error)
      })
      .finally(() => dispatch({ type: DATA_ACTIONS.FINISH_LOADING }))

    return () => {
      myAbortController.abort()
    }
  }, [mainPath, currentPage])

  // momoized value to avoid re renders
  const value = useMemo(() => ({ data, dispatch }), [data, dispatch])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
