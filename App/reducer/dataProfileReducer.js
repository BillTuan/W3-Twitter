import {FETCHING1, FETCH_SUCCESS1, FETCH_FAIL1} from '../action/const';

initialState = {
  isFetching: false,
  dataAPI: [],
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING1:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_SUCCESS1:
      return {
        ...state,
        dataAPI: action.data
      }

    case FETCH_FAIL1:
      return {
        ...state,
        error: true
      }
    default:
    return state
  }
}
