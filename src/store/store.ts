import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './users/authApi';
import usersReducer from './users/usersSlice';

const persistUserConfig = {
  key: 'c-service',
  storage,
  whitelist: ['user.token, user.refreshToken'],
};

const rootReducer = combineReducers({
  user: usersReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedUserReducer = persistReducer(persistUserConfig, rootReducer);

export const store = configureStore({
  reducer: persistedUserReducer,
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export type TypeRootState = ReturnType<typeof rootReducer>;
