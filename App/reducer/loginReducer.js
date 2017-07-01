import {LOGIN_SUCESS, LOGIN_FAIL} from '../action/constants';

initialState = {
  isLogin: false,
  info: {}
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCESS:
      return{
        isLogin: true,
        info: action.info
      }
      break;
    case LOGIN_FAIL:
      return {
        isLogin: false,
      }
    default:
      return state
  }
}
