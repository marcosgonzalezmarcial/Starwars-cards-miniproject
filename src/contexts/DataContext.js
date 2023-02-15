import { createContext, useEffect, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import { getTransformedDataArray } from 'services/getTransformedDataArray'

const initialData = {
  next: null,
  isLoading: false,
  planets: { data: [], page: 1 },
  starships: { data: [], page: 1 },
  characters: { data: [], page: 1 },
  films: { data: [], page: 1 }
}

function dataReducer(state, { type, payload }) {
  switch (type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'FINISH_LOADING':
      return { ...state, isLoading: false }
    case 'SET_STATE_BY_PATH':
      return {
        ...state,
        next: payload.next,
        [payload.mainPath]: {
          ...state[payload.mainPath],
          data: [
            ...new Set(
              [
                ...state[payload.mainPath].data,
                ...payload.newData
              ].map((item) => JSON.stringify(item))
            )
          ].map((item) => JSON.parse(item))
        }
      }
    case 'NEXT_PAGE':
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

    dispatch({ type: 'START_LOADING' })

    getTransformedDataArray({
      page: currentPage,
      signal
    })
      .then(({ transformedDataArray: newData, next }) => {
        newData &&
          dispatch({
            type: 'SET_STATE_BY_PATH',
            payload: { newData, next, mainPath }
          })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => dispatch({ type: 'FINISH_LOADING' }))

    return () => myAbortController.abort()
  }, [mainPath, currentPage])

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}
