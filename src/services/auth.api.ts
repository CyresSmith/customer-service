import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
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
        }),

        current: builder.query<AuthState, undefined>({
            query: () => ({
                url: '/users/current',
                method: 'GET',
            }),
            providesTags: ['user'],
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
