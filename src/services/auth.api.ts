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

export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['auth'],

    endpoints: builder => ({
        register: builder.mutation<RegisterResponse, UserRegister>({
            query: data => ({
                url: '/users/register',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['auth'],
        }),

        verify: builder.query<AuthState, unknown>({
            query: (token: string) => ({
                url: `/users/verify/${token}`,
                method: 'GET',
            }),
            providesTags: ['auth'],
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
            providesTags: ['auth'],
        }),

        updateUser: builder.mutation<User, UpdateUser>({
            query: ({ id, data }) => ({
                url: `/users/update/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['auth'],
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
            invalidatesTags: ['auth'],
        }),

        updatePassword: builder.mutation<Pick<RegisterResponse, 'message'>, UpdatePassword>({
            query: ({ id, data }) => ({
                url: `/users/update-password/${id}`,
                method: 'PATCH',
                data,
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
} = authApi;
