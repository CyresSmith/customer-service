import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { AuthState, RegisterResponse, UpdatePassword, UpdateUser, User, UserLogin, UserRegister, UserState } from '../store/user/user.types';
import { UploadAvatar } from '../store/user/user.types';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['authApi'],

  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, UserRegister>({
      query: data => ({
        url: '/users/register',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['authApi'],
    }),

    verify: builder.query<AuthState, unknown>({
      query: (token: string) => ({
        url: `/users/verify/${token}`,
        method: 'GET',
      }),
    }),

    logIn: builder.mutation<UserState, UserLogin>({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['authApi'],
    }),

    current: builder.query({
      query: () => ({
        url: '/users/current',
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<User, UpdateUser>({
      query: ({id, data}) => ({
        url: `/users/update/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['authApi'],
    }),

    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['authApi'],
    }),

    uploadAvatar: builder.mutation<{ url: string }, UploadAvatar>({
      query: ({ id, data }) => ({
        url: `/users/update/${id}/avatar`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['authApi'],
    }),

    updatePassword: builder.mutation<Pick<RegisterResponse, 'message'>, UpdatePassword>({
      query: ({id, data}) => ({
        url: `/users/update-password/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['authApi'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyQuery,
  useLogInMutation,
  useCurrentQuery,
  useLogOutMutation,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation
} = authApi;
