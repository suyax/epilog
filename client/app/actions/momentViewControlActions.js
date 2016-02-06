export const SET_COMMENTS_VISIBILITY = 'SET_COMMENTS_VISIBILITY';

export function setCommentsVisibility(value) {
  return {
    type: SET_COMMENTS_VISIBILITY,
    payload:{
      value: value,
    }
  }
}
