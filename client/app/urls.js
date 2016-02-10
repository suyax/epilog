// export const SERVER_URL = 'http://localhost:3000';

// digital ocean
export const SERVER_URL = 'http://104.131.118.27:3000';

// AUTHORIZATION ROUTES
export const AUTH_SIGNUP = '/api/users/signup'; // POST
export const AUTH_SIGNIN = '/api/users/signin'; // POST
export const AUTH_LOGOUT = '/api/users/logout'; // GET

// CHECK ROUTES
export const STORIES_CHECK = '/api/check/stories'; // POST

// STORY ROUTES
export const STORIES_ADD_USERS = '/api/stories'; //POST
export const STORIES_GET_ALL = '/api/stories'; // GET
export const STORIES_GET_ONE = '/api/stories'; // GET w/storyId

// MOMENT ROUTES
export const MOMENT_ADD = '/api/moments'; //POST
export const MOMENT_GET_ALL = 'api/moments/story'; // GET w/storyID
export const MOMENT_GET_ONE = 'api/moments'; // GET w/momentID

export const UPDATE_GET_ALL = 'api/updates';//GET
