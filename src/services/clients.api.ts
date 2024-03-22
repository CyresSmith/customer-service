import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import {
  AddClient,
  Client,
  UpdateClient,
  UploadAvatar,
} from 'store/clients/clients.types';
import { axiosBaseQuery } from './instance';

export const clientsApi = createApi({
  reducerPath: 'clientsApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['clientsApi'],

    endpoints: builder => {
        return ({
            createClient: builder.mutation<Client, AddClient>({
                query: ({ data, companyId }) => ({
                    url: `clients/create`,
                    method: 'POST',
                    data,
                    params: {companyId}
                }),
                invalidatesTags: ['clientsApi'],
            }),

            getAll: builder.query<Client[], unknown>({
                query: (companyId: number) => ({
                    url: `clients/get-all`,
                    method: 'GET',
                    params: {companyId}
                }),
            }),

            getById: builder.query<Client, { companyId: number, id: number }>({
                query: ({ companyId, id }) => ({
                    url: `clients/${id}`,
                    method: 'GET',
                    params: {companyId}
                })
            }),

            updateClient: builder.mutation<Client, UpdateClient>({
                query: ({ companyId, id, data }) => ({
                    url: `clients/${id}/update`,
                    method: 'PATCH',
                    data,
                    params: {companyId}
                }),
                invalidatesTags: ['clientsApi'],
            }),

            uploadAvatar: builder.mutation<{ url: string }, UploadAvatar>({
                query: ({ companyId, id, data }) => ({
                    url: `clients/${id}/update/avatar`,
                    method: 'POST',
                    data,
                    params: {companyId}
                }),
                invalidatesTags: ['clientsApi'],
            }),

            delete: builder.mutation<{message: string}, { companyId: number, id: number }>({
                query: ({ companyId, id }) => ({
                    url: `clients/${id}/delete`,
                    method: 'DELETE',
                    params: {companyId}
                }),
                invalidatesTags: ['clientsApi'],
            }),

      delete: builder.mutation<
        { message: string },
        { companyId: number; id: number }
      >({
        query: ({ companyId, id }) => ({
          url: `clients/${companyId}/${id}/delete`,
          method: 'DELETE',
        }),
        invalidatesTags: ['clientsApi'],
      }),
    };
  },
});

export const {
  useCreateClientMutation,
  useGetAllQuery,
  useGetByIdQuery,
  useUpdateClientMutation,
  useUploadAvatarMutation,
  useDeleteMutation,
} = clientsApi;
