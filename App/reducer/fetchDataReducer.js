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
        error: false,
        isFetching: true,
        dataAPI: []
      }
    case FETCH_SUCCESS:
      return {
        error: false,
        isFetching: false,
        dataAPI: action.data
      }

    case FETCH_FAIL:
      return {
        isFetching: false,
        error: true,
        dataAPI: []
      }
    default:
    return state
  }
}
