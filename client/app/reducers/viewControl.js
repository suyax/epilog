const initialStates = {
  currentView : "LOGIN"
};

export default function viewControl(state = initialStates, action = {}) {
  switch (action.type) {
    case "SET_VIEW":
      return {
        ...state,
        currentView: action.payload.viewName,
        passedProps: action.payload.passedProps
      };
    default:
      return state;
  }
}

// Store will look something like this.
// {
//   ...
//   viewControl: {
//     currentView:
//     passedProps:
//   }
//   ...
// }
