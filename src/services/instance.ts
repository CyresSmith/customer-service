import axios, { AxiosRequestConfig } from 'axios';
import handleError from 'helpers/errorHandler';
import rootActions from 'store/rootActions';
import { store } from 'store/store';

export const URL = 'http://localhost:8989/api';

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

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = store.getState()?.user?.refreshToken;

        if (token) {
          const response = await axios.get(URL + '/auth/refresh', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (
            response &&
            response?.data?.accessToken &&
            response?.data?.refreshToken
          ) {
            store.dispatch(rootActions.refresh(response?.data));

            instance.defaults.headers.common.Authorization = `Bearer ${response?.data?.accessToken}`;

            // ----------- Двічі спрацьовує originalRequest після оновлення токену.
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
