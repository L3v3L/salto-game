import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import reducer from "./ducks/game";

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(
  createStore
);

const configureStore = initialState =>
  createStoreWithMiddleware(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default configureStore;
