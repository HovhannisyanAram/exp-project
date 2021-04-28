import thunk from 'redux-thunk';
import logger from 'redux-logger';
import todoReducer from './reducers/todoReducer';
import searchReducer from './reducers/searchReducer';
import contactReducer from './reducers/contactReducer';
import singleTaskReducer from './reducers/singleTaskReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const middleware = [thunk, logger];
const reducers = combineReducers({
  todoState: todoReducer,
  searchState: searchReducer,
  contactState: contactReducer,
  singleTaskState: singleTaskReducer
})

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
