import reducer from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const middleware = [thunk, logger];

const store = createStore(reducer, applyMiddleware(...middleware));
export default store;
