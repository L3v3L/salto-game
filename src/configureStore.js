import { configureStore } from '@reduxjs/toolkit';
import reducer from './ducks/reducer';
import {
  endTurn,
  startMonsterMoves,
  playCardActivate,
  playCardExecute,
  targetSelectionDisable,
} from './ducks/middlewares';

// Create a function that returns the store with initial state
const configureStoreWithInitialState = (initialState) => configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }).concat([
    targetSelectionDisable,
    playCardActivate,
    playCardExecute,
    startMonsterMoves,
    endTurn,
  ]),
  devTools: process.env.NODE_ENV !== 'production',
});

export default configureStoreWithInitialState;
