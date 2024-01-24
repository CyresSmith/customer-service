import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'services/instance';
import { User } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['authApi'],

  endpoints: builder => ({
    register: builder.mutation<User, number | void>({
      query: data => ({
        url: '/register',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['authApi'],
    }),

    verify: builder.query({
      query: token => ({
        url: `/users/verify/${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyQuery } = authApi;
