import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, TokenState, UserState } from './user.types';

const initialState: UserState = {
  user: null,
  companies: [],
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(_, { payload }: PayloadAction<AuthState>) {
      return { ...payload, isLoggedIn: true };
    },
    setCurrentUser(state, { payload }: PayloadAction<AuthState>) {
      return { ...state, ...payload, isLoggedIn: true };
    },
    refresh(state, { payload }: PayloadAction<TokenState>) {
      return { ...state, ...payload };
    },
    logOut() {
      return initialState;
    },
  },
});

export default userSlice;