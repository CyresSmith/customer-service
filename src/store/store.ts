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
import { authApi } from '../services/auth.api';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';

const persistUserConfig = {
  key: 'service',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  user: userSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedUserReducer = persistReducer(
  persistUserConfig,
  userSlice.reducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
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
