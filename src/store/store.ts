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
import { categoriesApi } from 'services/categories.api';
import { clientsApi } from 'services/clients.api';
import { companyApi } from 'services/company.api';
import { employeeApi } from 'services/employee.api';
import { schedulesApi } from 'services/schedules.api';
import { serviceApi } from 'services/service.api';
import { authApi } from '../services/auth.api';
import chatSlice from './chat/chat.slice';
import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';
import { eventsApi } from 'services/events.api';

const persistUserConfig = {
    key: 'service',
    storage,
    whitelist: ['accessToken', 'refreshToken'],
};

const persistedUserReducer = persistReducer(persistUserConfig, userSlice.reducer);

const rootReducer = combineReducers({
    loading: loadingSlice.reducer,
    company: companySlice.reducer,
    chat: chatSlice.reducer,
    user: persistedUserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [schedulesApi.reducerPath]: schedulesApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
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
            .concat(serviceApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(schedulesApi.middleware)
            .concat(eventsApi.middleware),
});

export type TypeRootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
