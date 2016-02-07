import {AsyncStorage} from 'react-native';
import {SERVER_URL} from '../urls';

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECIEVE_COMMENTS = "RECIEVE_COMMENTS";
export const FAILURE_COMMENTS = "FAILURE_COMMENTS";

const ALL_COMMENTS_URL = SERVER_URL + '/api/comments'

export function requestComments (momentId) {
  return {
    type: REQUEST_COMMENTS,
    payload: {
      momentId: momentId,
    }
  }
}

export function recieveComments (comments) {
  return {
    type: RECIEVE_COMMENTS,
    payload: {
      comments: comments,
      recievedAt: Date.now(),
    },
  };
}

export function failureComments (error) {
  return {
    type: RECIEVE_COMMENTS,
    error: true,
    payload: error,
  };
}

export function fetchComments (momentId) {
  return function (dispatch) {
    dispatch(requestComments(momentId)); // let the user know we are loading the stories
    return ( // return the promise for convenience
      AsyncStorage.getItem('token') // get the authentication token
      .then((value) => {
        return (fetch( ALL_COMMENTS_URL+'?momentid='+momentId, { // WARNING: STRING CONCAT IS DANGEROUS!
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
        return dispatch(recieveComments(data));
      })
      .catch((error) => {
        return dispatch(failureComments(error))
      })
    ); 
  }
}

export const REQUEST_SUBMIT_COMMENT = "REQUEST_SUBMIT_COMMENT";
export const RECIEVE_SUBMIT_COMMENT = "RECIEVE_SUBMIT_COMMENT";

const SUBMIT_COMMENT_URL = SERVER_URL + '/api/comments';

export function requestSubmitComment (momentId) {
  return {
    type: REQUEST_SUBMIT_COMMENT,
    payload: {
      momentId: momentId,
    }
  }
}

export function successSubmitComment (comment) {
  return {
    type: RECIEVE_SUBMIT_COMMENT,
    payload: {
      comment: comment,
      recievedAt: Date.now(),
    },
  };
}

export function failureSubmitComment (error) {
  return {
    type: RECIEVE_SUBMIT_COMMENT,
    error: true,
    payload: error,
  };
}

// userid will be retrieved from the auth token
export function submitComment (text, momentId) {
  return function (dispatch) {
    dispatch(requestSubmitComment(momentId)); // let the user know we are loading the stories
    return ( // return the promise for convenience
      AsyncStorage.getItem('token') // get the authentication token
      .then((value) => {
        return (fetch( SUBMIT_COMMENT_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': value
          },
          body: JSON.stringify({
            text: text,
            momentId: momentId,
          }),
        }))
      })
      .then((response) => {
        if(!response.ok){
          throw new Error('Server response: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        return dispatch(successSubmitComment(data));
      })
      .catch((error) => {
        return dispatch(failureSubmitComment(error))
      })
    ); 
  }
}

























