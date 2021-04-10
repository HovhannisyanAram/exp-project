import thunk from 'redux-thunk';
import logger from 'redux-logger';
import todoReducer from './reducers/todoReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import searchReducer from './reducers/searchReducer';

const middleware = [thunk, logger];
const reducers = combineReducers({
  todoState: todoReducer,
  searchState: searchReducer,
})

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
