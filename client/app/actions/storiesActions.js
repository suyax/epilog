import {AsyncStorage} from 'react-native';
import {SERVER_URL} from '../urls';

export const REQUEST_STORIES = 'REQUEST_STORIES';
export const RECEIVE_STORIES = 'RECEIVE_STORIES';
const ALL_STORIES_URL = SERVER_URL + '/api/stories'

export function requestStories () {
  return {
    type: REQUEST_STORIES,
  }
}

export function receiveStories (stories) {
  return {
    type: RECEIVE_STORIES,
    payload: {
      stories: stories,
      receivedAt: Date.now(),
    },
  };
}

export function failureStories (error) {
  return {
    type: RECEIVE_STORIES,
    error: true,
    payload: error,
  };
}

export function fetchStories () {
  return function (dispatch) {
    dispatch(requestStories()); // let the user know we are loading the stories
    return ( // return the promise for convenience
      AsyncStorage.getItem('token') // get the authentication token
      .then((value) => {
        return (fetch( ALL_STORIES_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': value
          }
        }))
      })
      .then((response) => {
        if(!response.ok){
          throw new Error('Server response: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        return dispatch(receiveStories(data));
      })
      .catch((error) => {
        return dispatch(failuerStories(error))
      })
    );
  }
}
