export function setView(viewName, passedProps) {
  return {
    type: 'SET_VIEW', 
    payload: {
      viewName: viewName,
      passedProps: passedProps
    },
    error: null,
  };
}
