import {REQUEST_STORIES, RECEIVE_STORIES} from '../actions/storiesActions';

const initialStates = {
  loading: false,
  data: undefined,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
};

export default function stories(state = initialStates, action = {}) {
  switch (action.type) {
    case REQUEST_STORIES:
      return Object.assign({}, state, {
        loading: true,
      });

    case RECEIVE_STORIES:
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
          data: action.payload.stories,
          lastUpdated: action.payload.recievedAt,
        });
      }

    default:
      return state;
  }
}
