import {AsyncStorage} from 'react-native';
import {SERVER_URL} from '../urls';

export const REQUEST_UPDATES = 'REQUEST_UPDATES';
export const RECEIVE_UPDATES = 'RECEIVE_UPDATES';
const ALL_UPDATES_URL = SERVER_URL + '/api/updates'

export function requestUpdates () {
  return {
    type: REQUEST_UPDATES,
  }
}

export function receiveUpdates (updates) {
  return {
    type: RECEIVE_UPDATES,
    payload: {
      updates: updates,
      receivedAt: Date.now(),
    },
  };
}

export function failureUpdates (error) {
  return {
    type: RECEIVE_UPDATES,
    error: true,
    payload: error,
  };
}

export function fetchUpdates () {
  return function (dispatch) {
    dispatch(requestUpdates());
    return (
      AsyncStorage.getItem('token')
      .then((value) => {
        return (fetch( ALL_UPDATES_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': value
          }
        }))
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return dispatch(receiveUpdates(data));
      })
      .catch((error) => {
        return dispatch(failureUpdates(error))
      })
    );
  }
}
