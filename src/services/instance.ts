import axios from 'axios';
import usersApi from './usersApi';

export const URL = 'http://localhost:8989/api';

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = localStorage.getItem('refreshToken');

        if (token) {
          const { data } = await axios.get(URL + '/auth/refresh', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { accessToken, refreshToken } = data;

          if (accessToken && refreshToken) {
            usersApi.setTokens({ accessToken, refreshToken });
            return instance(originalRequest);
          }
        } else {
          usersApi.setTokens(null);
          return Promise.reject(error);
        }
      } catch (error) {
        usersApi.setTokens(null);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
