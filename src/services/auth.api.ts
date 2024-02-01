import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { State } from 'hooks/useForm';
import { axiosBaseQuery } from 'services/instance';
import { AuthState, RegisterResponse, UpdateUser, User } from '../store/user/user.types';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['authApi'],

  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, Omit<State, 'confirm'>>({
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

    logIn: builder.mutation<AuthState, Pick<State, 'email' | 'password'>>({
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

    updateUser: builder.mutation<UpdateUser, Partial<User>>({
      query: data => ({
        url: `/users/update/${data?.id}`,
        method: 'POST',
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
  }),
});

export const {
  useRegisterMutation,
  useVerifyQuery,
  useLogInMutation,
  useCurrentQuery,
  useLogOutMutation,
  useUpdateUserMutation
} = authApi;
