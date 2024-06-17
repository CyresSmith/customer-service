import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { store } from 'store/store';
import {
    AuthState,
    RegisterResponse,
    UpdatePassword,
    UpdateUser,
    UploadAvatar,
    User,
    UserLogin,
    UserRegister,
    UserState,
} from '../store/user/user.types';
import { createSocketConnection, socket } from './socket';
import { MessageResponse } from './types';

export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['auth', 'register', 'user'],

    endpoints: builder => ({
        register: builder.mutation<RegisterResponse, UserRegister>({
            query: data => ({
                url: '/users/register',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['register'],
        }),

        verify: builder.query<AuthState, unknown>({
            query: (token: string) => ({
                url: `/users/verify/${token}`,
                method: 'GET',
            }),
            providesTags: ['register', 'auth'],
        }),

        logIn: builder.mutation<UserState, UserLogin>({
            query: data => ({
                url: '/auth/login',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['auth'],
            async onCacheEntryAdded(_, { cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;

                if (data.accessToken) await createSocketConnection(data.accessToken);
            },
        }),

        current: builder.query<AuthState, undefined>({
            query: () => ({
                url: '/users/current',
                method: 'GET',
            }),
            providesTags: ['user'],
            async onCacheEntryAdded(_, { cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;
                const token = store.getState().user.accessToken;

                if (data.user && token) await createSocketConnection(token);
            },
        }),

        updateUser: builder.mutation<User, UpdateUser>({
            query: ({ id, data }) => ({
                url: `/users/update/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['user'],
        }),

        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['auth'],
            async onCacheEntryAdded(_, { cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;
                if (data) socket.disconnect();
            },
        }),

        uploadAvatar: builder.mutation<{ url: string }, UploadAvatar>({
            query: ({ id, data }) => ({
                url: `/users/update/${id}/avatar`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['user'],
        }),

        updatePassword: builder.mutation<Pick<RegisterResponse, 'message'>, UpdatePassword>({
            query: ({ id, data }) => ({
                url: `/users/update-password/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['user'],
        }),

        deleteUser: builder.mutation<MessageResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['auth'],
            async onCacheEntryAdded(_, { cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;

                if (data.message && socket) socket.disconnect();
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyQuery,
    useLogInMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useLogOutMutation,
    useUpdateUserMutation,
    useUploadAvatarMutation,
    useUpdatePasswordMutation,
    useDeleteUserMutation,
} = authApi;
