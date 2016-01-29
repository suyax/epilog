export const FETCH_STORIES = 'FETCH_STORIES';
export const RECIEVE_STORIES = 'RECIEVE_STORIES';

export function fetchStories () {
  return {
    type: FETCH_STORIES,
  }
}

export function recieveStories (stories) {
  return {
    type: RECIEVE_STORIES,
    payload: {
      stories: stories,
      recievedAt: Date.now(),
    },
  };
}

export function failureStories (error) {
  return {
    type: RECIEVE_STORIES,
    error: true,
    payload: error,
  };
}
