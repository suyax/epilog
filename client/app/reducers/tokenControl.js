import {CHECK_TOKEN_REQUEST, CHECK_TOKEN_RESPONSE} from '../actions/tokenActions.js';

const initialStates = {
  loading: false,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
};

export default function tokenControl (state = initialStates, action = {}) {
  switch (action.type) {
    case CHECK_TOKEN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });

    case CHECK_TOKEN_RESPONSE:
      if(action.error){
        return Object.assign({}, state, {
          loading: false,
          error: true,
          errorMessage: action.payload,
          lastUpdated: Date.now(),
        });
      } else {
        return Object.assign({}, state, {
          loading: false,
          error: false,
          erroMessage: undefined,
          lastUpdated: Date.now(),
        });
      }

    default:
      return state;
  }
}
