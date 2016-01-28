export function setView(viewName, passProps) {
  return {
    type: 'SET_VIEW', 
    payload: {
      viewName: viewName,
      passProps: passProps
    }
  };
}
