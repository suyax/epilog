const initialStates = {
  currentView : "HOME"
};

export default function viewControl(state = initialStates, action = {}) {
  switch (action.type) {
    case "SET_VIEW":
      return {
        ...state,
        currentView: action.viewName
      };
    default:
      return state;
  }
}
