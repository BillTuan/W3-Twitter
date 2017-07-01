import {LOGIN_SUCESS, LOGIN_FAIL} from './constants';

import { twitter } from 'react-native-simple-auth';

const config = {
   consumerKey: 'YKAVBoCGFTPcfgRvDoU7nZluM',
   consumerSecret: '7K0ZLaG0HrrXUfgha69sxnZmM8Idgpu4Z9VuZ8mEwS0pM4iRSZ',
};

function loginSucess (info) {
   return {
     type: LOGIN_SUCESS,
     info: info
   }
}

function loginFail () {
  return {
    type: LOGIN_FAIL
  }
}

export function doLogin() {
  return (dispatch) => {
    twitter({
       appId: config.consumerKey,
       appSecret: config.consumerSecret,
       callback: 'rncs://authorize',
     }).then((info) => {
       dispatch(loginSucess(info))
     }).catch ((error) => {
       dispatch(loginFail())
     })
  }
}
