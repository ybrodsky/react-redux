import { combineReducers } from 'redux';
import { postsBySubreddit } from './posts';
import { selectedSubreddit } from './subreddits';

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})
 
export default rootReducer;