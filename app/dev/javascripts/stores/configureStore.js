'user strict';

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middlewares/callAPIMiddleware'
import rootReducer from '../reducers'

const logger = createLogger();
const finalCreateStore = compose(
  applyMiddleware(thunk, api, logger)
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}
