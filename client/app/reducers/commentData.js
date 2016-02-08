import {combineReducers} from 'redux';
import {
  REQUEST_COMMENTS, 
  RECEIVE_COMMENTS,
  REQUEST_SUBMIT_COMMENT,
  RECEIVE_SUBMIT_COMMENT,
} from '../actions/commentDataActions';

function fetchedComments (state = {
  momentId: undefined,
  loading: false,
  data: undefined,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        momentId:action.payload.momentId,
        loading: true,
      });

    case RECEIVE_COMMENTS:
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
          data: action.payload.comments,
          lastUpdated: action.payload.receivedAt,
        });
      }

    default:
      return state;
  }
}

function submitComment (state={
  submitting: false,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
}, action) {
  switch (action.type) {
    case REQUEST_SUBMIT_COMMENT:
      return Object.assign({}, state, {
        momentId:action.payload.momentId,
        submitting: true,
      });

    case RECEIVE_SUBMIT_COMMENT:
      if(action.error === true){
        return Object.assign({}, state, {
          submitting: false,
          error: true,
          errorMessage: action.payload,
          lastUpdated: Date.now(),
        });
      } else {
        return Object.assign({}, state, {
          submitting: false,
          error: false,
          lastUpdated: action.payload.receivedAt,
        });
      }

    default:
      return state;
  }
}

const commentData = combineReducers({
  fetchedComments,
  submitComment,
})

export default commentData;
