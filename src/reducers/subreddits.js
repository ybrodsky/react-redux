import {
	SELECT_SUBREDDIT,
	INVALIDATE_SUBREDDIT,
} from './../constants/types';

export const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
};