import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import {
  AddClient,
  Client,
  UpdateClient,
  UploadAvatar,
} from 'services/types/clients.types';
import { axiosBaseQuery } from './instance';

export const clientsApi = createApi({
  reducerPath: 'clientsApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['clients', 'client'],

  endpoints: builder => {
    return {
      createClient: builder.mutation<Client, AddClient>({
        query: ({ data, companyId }) => ({
          url: `clients/create`,
          method: 'POST',
          data,
          params: { companyId },
        }),
        invalidatesTags: ['clients'],
      }),

      getAll: builder.query<Client[], unknown>({
        query: (companyId: number) => ({
          url: `clients/get-all`,
          method: 'GET',
          params: { companyId },
        }),
        providesTags: resp =>
          resp
            ? resp.map(item => ({ type: 'clients', id: item.id }))
            : ['clients'],
      }),

      getById: builder.query<Client, { companyId: number; id: number }>({
        query: ({ companyId, id }) => ({
          url: `clients/${id}/one-by-id`,
          method: 'GET',
          params: { companyId },
        }),
        providesTags: (resp, err, arg) => [{ type: 'client', id: arg.id }],
      }),

      updateClient: builder.mutation<Client, UpdateClient>({
        query: ({ companyId, id, data }) => ({
          url: `clients/${id}/update`,
          method: 'PATCH',
          data,
          params: { companyId },
        }),
        invalidatesTags: (resp, err, arg) => [
          { type: 'client', id: arg.id },
          { type: 'clients', id: arg.id },
        ],
      }),

      uploadAvatar: builder.mutation<{ url: string }, UploadAvatar>({
        query: ({ companyId, id, data }) => ({
          url: `clients/${id}/update/avatar`,
          method: 'POST',
          data,
          params: { companyId },
        }),
        invalidatesTags: (resp, err, arg) => [
          { type: 'client', id: arg.id },
          { type: 'clients', id: arg.id },
        ],
      }),

      delete: builder.mutation<
        { message: string },
        { companyId: number; id: number }
      >({
        query: ({ companyId, id }) => ({
          url: `clients/${id}/delete`,
          method: 'DELETE',
          params: { companyId },
        }),
        invalidatesTags: (resp, err, arg) => [
          { type: 'client', id: arg.id },
          { type: 'clients', id: arg.id },
        ],
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
