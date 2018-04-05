import fetch from 'cross-fetch';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
} from './../constants/types';

export const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
};

export const receivePosts = (subreddit, json) => {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  }
};

const fetchPosts = (subreddit) => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
 
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
 
    dispatch(requestPosts(subreddit));
 
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
 
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
 
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error);
      )
      	// We can dispatch many times!
        // Here, we update the app state with the results of the API call.
      .then(json => dispatch(receivePosts(subreddit, json)));
  }
};

export const fetchPostsIfNeeded = (subreddit) => {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
 
  // This is useful for avoiding a network request if
  // a cached value is already available.
 
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(subreddit));
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  }
};