import axios, { AxiosRequestConfig } from 'axios';
import handleError from 'helpers/errorHandler';
import rootActions from 'store/rootActions';
import { store } from 'store/store';
import { TokenState } from 'store/user/user.types';
import { createSocketConnection, socket } from './socket';

export const URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: URL,
});

export const axiosBaseQuery =
    () =>
    async ({ url = '', method, data, params }: AxiosRequestConfig) => {
        try {
            store.dispatch(rootActions.setLoading(true));

            const response = await instance({
                url,
                method,
                data,
                params,
            });
            return response;
        } catch (e) {
            return {
                error: handleError(e),
            };
        } finally {
            store.dispatch(rootActions.setLoading(false));
        }
    };

instance.interceptors.request.use(
    config => {
        const accessToken = store.getState()?.user?.accessToken;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const refreshUser = async (data: TokenState) => {
    socket.disconnect();

    if (data.accessToken) await createSocketConnection(data.accessToken);

    store.dispatch(rootActions.refresh(data));
};

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error?.response?.status === 401 ||
            (error?.response?.status === 403 && !originalRequest._retry)
        ) {
            originalRequest._retry = true;

            try {
                const token = store.getState()?.user?.refreshToken;

                if (token) {
                    const { data } = await axios.get(URL + '/auth/refresh', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (data && data.accessToken && data.refreshToken) {
                        await refreshUser(data);

                        instance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
                        return instance(originalRequest);
                    }
                } else {
                    store.dispatch(rootActions.logOut());
                    return Promise.reject(error);
                }
            } catch (error) {
                store.dispatch(rootActions.logOut());
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
