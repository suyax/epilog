const initialStates = {
  loaded: false,
  data: undefined,
  lastUpdated: undefined,
  error: false,
  errorMessage: undefined,
};

export default function stories(state = initialStates, action = {}) {
  switch (action.type) {
    case "FETCH_STORIES":
      return Object.assign({}, state, {
        loaded: false
      });

    case "RECIEVE_STORIES":
      if(action.error === true){
        return Object.assign({}, state, {
          loaded: false,
          error: true,
          errorMessage: action.payload,
        });
      } else {
        return Object.assign({}, state, {
          loaded: true,
          data: action.payload.stories,
          lastUpdated: action.payload.recievedAt,
        });
      }

    default:
      return state;
  }
}
