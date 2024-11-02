import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedMinesBetReducer from './game';

export const store = configureStore({
  reducer: {
    minesBet: persistedMinesBetReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
