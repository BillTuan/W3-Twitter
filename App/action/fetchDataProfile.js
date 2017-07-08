import {FETCHING1, FETCH_SUCCESS1, FETCH_FAIL1} from './const';
import { getHeaders, } from 'react-native-simple-auth/lib/utils/oauth1';

const config = {
   consumerKey: 'YKAVBoCGFTPcfgRvDoU7nZluM',
   consumerSecret: '7K0ZLaG0HrrXUfgha69sxnZmM8Idgpu4Z9VuZ8mEwS0pM4iRSZ',
};

function fetching() {
  return {
    type: FETCHING1
  }
}

function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS1,
    data: data
  }
}

function fetchFail () {
  return {
    type: FETCH_FAIL1,
  }
}


export function fetchDataProfile (info, apiLink) {
  const { credentials: { oauth_token, oauth_token_secret } } = info;
  const httpMethod = 'GET';
  const url = apiLink;
  const headers = getHeaders(url, {count: 50}, {}, config.consumerKey, config.consumerSecret, httpMethod, oauth_token, oauth_token_secret);
  return (dispatch) => {
    dispatch(fetching())
    fetch(url + '?count=50', {
      method: httpMethod,
      headers
    }).then((response) => response.json())
    .then((responseJSON) => {
      dispatch(fetchSuccess(responseJSON))
    }).catch((err) => dispatch(fetchFail(err)))
  }
}
