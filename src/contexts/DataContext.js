import { createContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getTransformedDataArray } from 'services/getTransformedDataArray'
// import { deepEqual } from 'utils/deepEqual'

const initialData = {
  // next: null,
  isLoading: false,
  planets: { data: [], page: 1, next: '' },
  starships: { data: [], page: 1, next: '' },
  characters: { data: [], page: 1, next: '' },
  films: { data: [], page: 1 }
}

const DATA_ACTIONS = {
  START_LOADING: 'START_LOADING',
  FINISH_LOADING: 'FINISH_LOADING',
  GET_DATA_BY_PATH: 'GET_DATA_BY_PATH',
  NEXT_PAGE: 'NEXT_PAGE'
}

let cachedData = {}

function dataReducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case DATA_ACTIONS.START_LOADING:
      return { ...state, isLoading: true }
    case DATA_ACTIONS.FINISH_LOADING:
      return { ...state, isLoading: false }
    case DATA_ACTIONS.GET_DATA_BY_PATH:
      const { next, mainPath, newData } = payload
      // caching data, not page change so it can be compared to avoid re renders
      cachedData = {
        ...state,
        // overwrite specific type of data property on state (starshios, planets or characters)
        [mainPath]: {
          // keep all its properties
          ...state[mainPath],
          next,
          // overwrite its data with newData & avoiding duplicate data
          data: [
            ...new Set(
              [...state[mainPath].data, ...newData].map((item) =>
                JSON.stringify(item)
              )
            )
          ].map((item) => JSON.parse(item))
        }
      }
      return {
        ...state,
        // overwrite specific type of data property on state (starshios, planets or characters)
        [mainPath]: {
          // keep all its properties
          ...state[mainPath],
          // overwrite its data with newData & avoiding duplicate data
          next,
          data: [
            ...new Set(
              [...state[mainPath].data, ...newData].map((item) =>
                JSON.stringify(item)
              )
            )
          ].map((item) => JSON.parse(item))
        }
      }
    case DATA_ACTIONS.NEXT_PAGE:
      const { mainPath: path } = payload
      return {
        ...state,
        [path]: {
          ...state[path],
          page: state[path].page + 1
        }
      }

    default:
      return state
  }
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
    // Caching data in a use ref but keep the previous page count to compare and avoid re fetchings
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
    // NEW WORKING VERSION
    // check if is any cached data
    if (cachedData[mainPath]?.data?.length > 0) {
      // console.log('cachedData mainPath length > 0')
      // check if cached data type page = current data type page
      if (cachedData[mainPath]?.page === currentPage) {
        // console.log('cachedData page = data page ')
        if (!cachedData[mainPath]?.next) {
          // console.log(cachedData[mainPath])
          // console.log('cachedData next')
          return
        }
        return
      }
    }

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
