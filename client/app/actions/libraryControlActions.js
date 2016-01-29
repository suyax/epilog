import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = "http://127.0.0.1:3000/stroies";

function requestPosts(story) {
  return {
    type: REQUEST_POSTS,
    payload: {
      story,
    },
  }
}

function receivePosts(story, json) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      story: story,
      posts: json.data.children.map(child => child.data),
      receiveAt: Date.now()
    }
  }
}

function fetchPosts(story) {
  return dispath => {
    dispath(receivePosts(story))
    return fetch( REQUEST_URL)
      .then(reponse => reponse.json())
      .then(json => dispath(receivePosts(story, json)))
  }
}

// The stuff below is not needed, at least not yet
// It comes from a redux example about fetching reddit posts
// It handles update fuctionality

// function shouldFetchPosts(state, story) {
//   const posts = state.posts
//   if (!posts) {
//     return true
//   }
//   else if (posts.isFetching) {
//     return false
//   }
//   return false
// }

// export function fetchPostsIfNeeded(story) {
//   return (dispath, getState) => {
//     if (shouldFetchPosts(getState(), story)) {
//       return dispath(fetchPosts(story))
//     }
//   }
// }
