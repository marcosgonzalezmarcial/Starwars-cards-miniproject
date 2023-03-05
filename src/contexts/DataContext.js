import {
  createContext,
  useEffect,
  useMemo,
  useReducer /*, useRef*/
} from 'react'
import { useLocation } from 'react-router-dom'
import { getTransformedDataArray } from 'services/getTransformedDataArray'
// import { deepEqual } from 'utils/deepEqual'

const initialData = {
  next: null,
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

let cache = {}

function dataReducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case DATA_ACTIONS.START_LOADING:
      return { ...state, isLoading: true }
    case DATA_ACTIONS.FINISH_LOADING:
      return { ...state, isLoading: false }
    case DATA_ACTIONS.GET_DATA_BY_PATH:
      const { next, mainPath, newData } = payload
      // caching data
      cache = {
        ...state,
        next,
        // overwrite specific type of data property on state (starshios, planets or characters)
        [mainPath]: {
          // keep all its properties
          ...state[mainPath],
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
        next,
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
      return {
        ...state,
        [payload.mainPath]: {
          ...state[payload.mainPath],
          page: state[payload.mainPath].page + 1
        }
      }

    default:
      return state
  }
}

export const DataContext = createContext(null)

export const DataContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialData)

  let location = useLocation()
  let mainPath = location.pathname.slice(1).split('/')[0]
  let currentPage = data[mainPath].page

  // fetch data if the user navigates or if paginates scrolling down
  useEffect(() => {
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (cache[mainPath]?.data?.length > 0) {
      if (cache[mainPath]?.data?.length === data[mainPath]?.data?.length) {
        if (cache[mainPath]?.page === data[mainPath]?.page) {
          if (mainPath === 'starships') {
            if (cache[mainPath]?.page === 4) return
          }
          if (mainPath === 'planets') {
            if (cache[mainPath]?.page === 7) return
          }
          if (mainPath === 'characters') {
            if (cache[mainPath]?.page === 9) return
          }
          if (cache[mainPath]?.next) {
            return
          }
        }
      }
    }

    dispatch({ type: DATA_ACTIONS.START_LOADING })
    getTransformedDataArray({
      page: currentPage,
      mainPath,
      signal
    })
      .then(({ transformedDataArray: newData, next }) => {
        newData &&
          dispatch({
            type: DATA_ACTIONS.GET_DATA_BY_PATH,
            payload: { newData, next, mainPath }
          })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => dispatch({ type: DATA_ACTIONS.FINISH_LOADING }))

    return () => myAbortController.abort()
  }, [mainPath, currentPage])

  // momoized value to avoid re renders
  const value = useMemo(() => ({ data, dispatch }), [data, dispatch])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
