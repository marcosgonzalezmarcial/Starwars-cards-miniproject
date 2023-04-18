export const DATA_ACTIONS = {
	START_LOADING: 'START_LOADING',
	FINISH_LOADING: 'FINISH_LOADING',
	GET_DATA_BY_PATH: 'GET_DATA_BY_PATH',
	NEXT_PAGE: 'NEXT_PAGE',
}

export function dataReducer(state, action) {
	const { type, payload } = action
	switch (type) {
		case DATA_ACTIONS.START_LOADING:
			return { ...state, isLoading: true }
		case DATA_ACTIONS.FINISH_LOADING:
			return { ...state, isLoading: false }
		case DATA_ACTIONS.GET_DATA_BY_PATH:
			const { next, elementType, newData } = payload
			return {
				...state,
				// overwrite specific type of data property on state (starships, planets or characters)
				[elementType]: {
					// keep all its properties
					...state[elementType],
					// overwrite its data with newData & avoiding duplicate data
					next,
					// saves only unique data avoids duplications
					data: [...state[elementType].data, ...newData],
				},
			}
		case DATA_ACTIONS.NEXT_PAGE:
			// debugger
			const { currentPath: resourceType } = payload

			return {
				...state,
				[resourceType]: {
					...state[resourceType],
					page: state[resourceType].page + 1,
				},
			}
		default:
			return state
	}
}
