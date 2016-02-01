export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECIEVE_RESPONSE = 'RECEIVE_RESPONSE';

export function requestLogIn () {
  return {
    type: REQUEST_LOGIN,
  }
}

export function receiveResponse (response) {
  return {
    type: RECIEVE_RESPONSE,
    payload: {
      response: response,
      recievedAt: Date.now(),
    },
  };
}

export function failureResponse (error) {
  return {
    type: RECIEVE_RESPONSE,
    error: true,
    payload: error,
  };
}
