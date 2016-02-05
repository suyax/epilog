import {TOGGLE_COMMENTS} from '../action/momentViewControlActions';

const initialStates = {
  showComments : false
};

export default function viewControl(state = initialStates, action = {}) {
  switch (action.type) {
    case "TOGGLE_COMMENTS":
      return Object.assign({}, state, {
        showComments: !state.showComments;
      });    
    default:
      return state;
  }
}
