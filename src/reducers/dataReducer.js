export const DATA_ACTIONS = {
  START_LOADING: 'START_LOADING',
  FINISH_LOADING: 'FINISH_LOADING',
  GET_DATA_BY_PATH: 'GET_DATA_BY_PATH',
  NEXT_PAGE: 'NEXT_PAGE'
}

export function dataReducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case DATA_ACTIONS.START_LOADING:
      return { ...state, isLoading: true }
    case DATA_ACTIONS.FINISH_LOADING:
      return { ...state, isLoading: false }
    case DATA_ACTIONS.GET_DATA_BY_PATH:
      const { next, currentPath, newData } = payload
      return {
        ...state,
        // overwrite specific type of data property on state (starships, planets or characters)
        [currentPath]: {
          // keep all its properties
          ...state[currentPath],
          // overwrite its data with newData & avoiding duplicate data
          next,
          // saves only unic data avoids duplications
          data: [...new Set([...state[currentPath].data, ...newData])]
        }
      }
    case DATA_ACTIONS.NEXT_PAGE:
      const { currentPath: path } = payload
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
