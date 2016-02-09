import {REQUEST_UPDATES, RECEIVE_UPDATES} from '../actions/updateActions';

const initialStates = {
  loading: false,
  data: undefined,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
};

export default function updates(state = initialStates, action = {}) {
  switch (action.type) {
    case REQUEST_UPDATES:
      return Object.assign({}, state, {
        loading: true,
      });

    case RECEIVE_UPDATES:
      if(action.error === true){
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
          data: action.payload.updates,
          lastUpdated: action.payload.receivedAt,
        });
      }

    default:
      return state;
  }
}
