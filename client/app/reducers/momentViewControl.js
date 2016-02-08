import {SET_COMMENTS_VISIBILITY} from '../actions/momentViewControlActions';

const initialStates = {
  commentsVisibility: false
};

export default function momentViewControl(state = initialStates, action = {}) {
  switch (action.type) {
    case "SET_COMMENTS_VISIBILITY":
      return Object.assign({}, state, {
        commentsVisibility: action.payload.value,
      });    
    default:
      return state;
  }
}
