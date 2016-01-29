
// @param url: url of request
// @param fetchOptions: options to pass to fetch
// @param requestAction: redux action creator to be dispatched when fetch is requested
// @param successAction: redux action creator to be dispatched when fetch succeeds,
  // data will be passed to this action creator
// @param failureAction: redux action creator to be dispatched when fetch fails
  // error will be passed to this acion creator
// @return a thunk that fetches data from the network and dispatches redux actions
export function thunkFetch (url, fetchOptions, requestAction,successAction,failureAction){
  return function (dispatch) {
    dispatch(requestAction());

    return ( fetch(url, fetchOptions)
      .then(response => response.json())
      .then(data => dispatch(successAction(data)))
      .catch(error => dispatch(failureAction(error)))
    );
  }

}
