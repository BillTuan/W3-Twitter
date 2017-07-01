import {FETCHING, FETCH_SUCCESS, FETCH_FAIL} from './const';
import { getHeaders, } from 'react-native-simple-auth/lib/utils/oauth1';

const config = {
   consumerKey: 'YKAVBoCGFTPcfgRvDoU7nZluM',
   consumerSecret: '7K0ZLaG0HrrXUfgha69sxnZmM8Idgpu4Z9VuZ8mEwS0pM4iRSZ',
};

function fetching() {
  return {
    type: FETCHING
  }
}

function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data: data
  }
}

function fetchFail () {
  return {
    type: FETCH_FAIL,
  }
}


export function fetchData (info, apiLink) {

  const { credentials: { oauth_token, oauth_token_secret } } = info;
  const httpMethod = 'GET';
  const url = apiLink;
  const headers = getHeaders(url, {}, {}, config.consumerKey, config.consumerSecret, httpMethod, oauth_token, oauth_token_secret);
  return (dispatch) => {
    dispatch(fetching())
    fetch(url, {
      method: httpMethod,
      headers
    }).then((response) => response.json())
    .then((responseJSON) => {
      dispatch(fetchSuccess(responseJSON))
    }).catch((err) => dispatch(fetchFail(err)))
  }
}