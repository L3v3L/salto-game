import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './ducks/reducer';
import {
  endTurn,
  startMonsterMoves,
  playCardActivate,
  playCardExecute,
  targetSelectionDisable,
} from './ducks/middlewares';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  targetSelectionDisable,
  playCardActivate,
  playCardExecute,
  startMonsterMoves,
  endTurn,
];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger');

  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });

  middlewares.push(logger);
}

const configureStore = (initialState) => createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      ...middlewares,
    ),
  ),
);

export default configureStore;
