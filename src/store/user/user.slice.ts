import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, Company, TokenState, User, UserState } from './user.types';

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
        logIn(_, { payload }: PayloadAction<UserState>) {
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

        addNewCompany(state, { payload }: PayloadAction<Company>) {
            return {
                ...state,
                companies: state?.companies?.length > 0 ? [...state.companies, payload] : [payload],
            };
        },

        updateUser(state, { payload }: PayloadAction<User>) {
            return {
                ...state,
                user: payload,
            };
        },

        setAvatar(state, { payload }: PayloadAction<Pick<User, 'avatar'>>) {
            if (state.user) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        avatar: payload.avatar,
                    },
                };
            }
            return state;
        },

        updatePassword(_, { payload }) {
            return payload;
        },
    },
});

export default userSlice;
