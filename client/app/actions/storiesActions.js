import {AsyncStorage} from 'react-native';

export const REQUEST_STORIES = 'REQUEST_STORIES';
export const RECIEVE_STORIES = 'RECIEVE_STORIES';
const ALL_STORIES_URL = 'http://127.0.0.1:3000/api/stories'

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
