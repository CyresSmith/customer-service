import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistUserConfig = {
    key: 'users',
    storage,
    whitelist: ['token, refreshToken']
};

const persistedUserReducer = persistReducer(persistUserConfig, usersReducer);

export const store = configureStore({
    reducer: {
        users: persistedUserReducer,
        // nfts: nftReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);