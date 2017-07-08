import {FETCHING, FETCH_SUCCESS, FETCH_FAIL} from '../action/const';

initialState = {
  isFetching: false,
  dataAPI: [],
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        dataAPI: action.data
      }

    case FETCH_FAIL:
      return {
        ...state,
        error: true,
      }
    default:
    return state
  }
}
