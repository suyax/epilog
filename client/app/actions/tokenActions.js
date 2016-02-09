import {AsyncStorage} from 'react-native';
import {SERVER_URL} from '../urls';

export const CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST';
export const CHECK_TOKEN_RESPONSE = 'CHECK_TOKEN_RESPONSE';
const CHECK_TOKEN_URL = SERVER_URL + '/api/users/token'

export function checkTokenRequest () {
  return {
    type: CHECK_TOKEN_REQUEST,
  }
}

export function checkTokenSuccess () {
  return {
    type: CHECK_TOKEN_RESPONSE,
    error: false,
  };
}

export function checkTokenFailure (error) {
  return {
    type: CHECK_TOKEN_RESPONSE,
    error: true,
    payload: error,
  };
}

export function checkToken () {
  return function (dispatch) {
    dispatch(checkTokenRequest()); // let the user know we are loading the stories
    return ( // return the promise for convenience
      AsyncStorage.getItem('token') // get the authentication token
      .then((value) => {
        console.log('token value: ', value);
        return (fetch( CHECK_TOKEN_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': value
          }
        }));
      })
      .then((response) => {
        if(!response.ok){
          throw new Error('Server response: ' + response.status);
        }
        console.log('token is valid');
        return dispatch(checkTokenSuccess());
      })
      .catch((error) => {
        console.log('token is invalid');
        return dispatch(checkTokenFailure(error))
      })
    ); 
  }
}
