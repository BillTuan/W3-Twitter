import {combineReducers} from 'redux';
import nav from './navigation';
import loginReducer from './loginReducer';
import dataReducer from './fetchDataReducer';
import dataProfile from './dataProfileReducer';

export default combineReducers({
  nav,
  loginReducer,
  dataReducer,
  dataProfile,
  // postReducer
})
