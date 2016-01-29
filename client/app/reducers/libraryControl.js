const initialStates = {
  isFetching: false,
  item: []
};

export default function libraryControl(state = initialStates, action = {}) {
  switch (action.type) {
    case "REQUEST_POSTS":
      return {
        ...state,
        isFetching: true,
      }
    case "RECEIVE_POSTS":
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    default:
      return state;
  }
}
