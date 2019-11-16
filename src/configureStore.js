import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import reducer from "./ducks/reducer";
import {
  endTurn,
  playCardActivate,
  playCardExecute,
  targetSelectionDisable,
} from "./ducks/middlewares";

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = initialState =>
  createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        targetSelectionDisable,
        playCardActivate,
        playCardExecute,
        endTurn,
        loggerMiddleware
      )
    )
  );

export default configureStore;
