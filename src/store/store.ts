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
import { companyApi } from 'services/company.api';
import { authApi } from '../services/auth.api';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';

const persistUserConfig = {
  key: 'service',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const persistedUserReducer = persistReducer(
  persistUserConfig,
  userSlice.reducer
);

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  user: persistedUserReducer,
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(companyApi.middleware),
});

export type TypeRootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
