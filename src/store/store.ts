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
import { clientsApi } from 'services/clients.api';
import { companyApi } from 'services/company.api';
import { employeeApi } from 'services/employee.api';
import { authApi } from '../services/auth.api';
import clientsSlice from './clients/clients.slice';
import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';
import employeesSlice from './employees/employees.slice';
import { schedulesApi } from 'services/schedules.api';
import schedulesSlice from './schedules/schedules.slice';

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
  company: companySlice.reducer,
  user: persistedUserReducer,
  clients: clientsSlice.reducer,
  employees: employeesSlice.reducer,
  schedules: schedulesSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [schedulesApi.reducerPath]: schedulesApi.reducer,
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
      .concat(companyApi.middleware)
      .concat(clientsApi.middleware)
      .concat(employeeApi.middleware)
      .concat(schedulesApi.middleware),
});

export type TypeRootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
