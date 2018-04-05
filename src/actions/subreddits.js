import {
	SELECT_SUBREDDIT,
	INVALIDATE_SUBREDDIT,
} from './../constants/types';

export const selectSubreddit = (subreddit) => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  }
};

export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  }
};