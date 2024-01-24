import { State } from 'hooks/useForm';
import { Tokens, User } from 'store/users/types';
import instance from './instance';

const setTokens = (tokens: Tokens | null): void => {
  if (tokens) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

const register = async (
  userData: State
): Promise<{ verify: boolean } | undefined> => {
  const response = await instance.post('/users/register', userData);

  if (response?.status === 201) {
    return { verify: false };
  }
};

const verify = async (code: string): Promise<User> => {
  const { data } = await instance.post('/users/verify', { code });
  const { user, accessToken, refreshToken } = data;
  setTokens({ accessToken, refreshToken });
  return user;
};

const login = async (userData: State): Promise<User> => {
  const { data } = await instance.post('/auth/login', userData);
  const { user, accessToken, refreshToken } = data;
  setTokens({ accessToken, refreshToken });
  return user;
};

const current = async (): Promise<User> => {
  const { data } = await instance.get('/users/current');
  return data;
};

const logout = async (): Promise<boolean> => {
  const response = await instance.get('/auth/logout');
  if (response.status === 200) {
    setTokens(null);
    return true;
  } else {
    return false;
  }
};

export default {
  register,
  verify,
  login,
  current,
  setTokens,
  logout,
};
