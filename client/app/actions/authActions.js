export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECIEVE_RESPOND = 'RECEIVE_RESPOND';


export function requestLogIn () {
  return {
    type: REQUEST_LOGIN,
  }
}

export function receiveRespond (respond) {
  return {
    type: RECIEVE_RESPOND,
    payload: {
      respond: respond,
      recievedAt: Date.now(),
    },
  };
}

export function failureRespond (error) {
  return {
    type: RECIEVE_RESPOND,
    error: true,
    payload: error,
  };
}
