import {combineReducers} from 'redux';
import nav from './navigation';
import loginReducer from './loginReducer';
import dataReducer from './fetchDataReducer';

export default combineReducers({
  nav,
  loginReducer,
  dataReducer
})
