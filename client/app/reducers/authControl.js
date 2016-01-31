const initialStates = {
  requestSent: false,
  isLoggedIn: false,
  respond: undefined,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
};

export default function authControl(state = initialStates, action = {}) {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        requestSent: true
      }
    case "RECEIVE_RESPOND":
      if(action.error === true){
        return {
          ...state,
          error: true,
          errorMessage: action.playload,
      });
    } else {
      return {
        ...state,
        isLoggedIn: true,
        respond: action.payload.respond
        lastUpdated: action.payload.receiveAt,
      });
    }
    default:
      return state;
  }
}
