import {AsyncStorage} from 'react-native';
import {SERVER_URL} from '../urls';

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECIEVE_COMMENTS = "RECIEVE_COMMENTS";
export const FAILURE_COMMENTS = "FAILURE_COMMENTS";

const ALL_STORIES_URL = SERVER_URL + '/api/comments'

export function requestStories () {
  return {
    type: REQUEST_STORIES,
  }
}

export function recieveStories (stories) {
  return {
    type: RECIEVE_STORIES,
    payload: {
      stories: stories,
      recievedAt: Date.now(),
    },
  };
}

export function failureStories (error) {
  return {
    type: RECIEVE_STORIES,
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
        return response.json();
      })
      .then((data) => {
        return dispatch(recieveStories(data));
      })
      .catch((error) => {
        return dispatch(failuerStories(error))
      })
    ); 
  }
}
