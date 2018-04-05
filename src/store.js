import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchPostsIfNeeded } from './actions/posts';
import { selectSubreddit } from './actions/subreddits';

import rootReducer from './reducers/index';
 
const loggerMiddleware = createLogger()
 
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)
 
store.dispatch(selectSubreddit('reactjs'));
store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));