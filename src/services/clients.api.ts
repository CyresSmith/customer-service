import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { AddClient, Client, UpdateClient, UploadAvatar } from 'services/types/clients.types';
import { axiosBaseQuery } from './instance';

export const clientsApi = createApi({
    reducerPath: 'clientsApi',

    baseQuery: axiosBaseQuery('clients') as BaseQueryFn,

    tagTypes: ['clients'],

    endpoints: builder => {
        return {
            createClient: builder.mutation<Client, AddClient>({
                query: ({ data, companyId }) => ({
                    url: `/create`,
                    method: 'POST',
                    data,
                    params: { companyId },
                }),
                invalidatesTags: [{ type: 'clients', id: 'LIST' }],
            }),

            getAllClients: builder.query<Client[], unknown>({
                query: (companyId: number) => ({
                    url: `/get-all`,
                    method: 'GET',
                    params: { companyId },
                }),
                providesTags: resp =>
                    resp
                        ? [
                              ...resp.map(({ id }) => ({ type: 'clients' as const, id })),
                              { type: 'clients', id: 'LIST' },
                          ]
                        : [{ type: 'clients', id: 'LIST' }],
            }),

            getById: builder.query<Client, { companyId: number; id: number }>({
                query: ({ companyId, id }) => ({
                    url: `/${id}/one-by-id`,
                    method: 'GET',
                    params: { companyId },
                }),
                providesTags: (_resp, _err, { id }) => [{ type: 'clients', id }],
            }),

            getByPhone: builder.query<Client, { companyId: number; phone: string; id: number }>({
                query: ({ companyId, phone }) => ({
                    url: `/${phone}/one-by-phone`,
                    method: 'GET',
                    params: { companyId },
                }),
                providesTags: (_resp, _err, { id }) => [{ type: 'clients', id }],
            }),

            updateClient: builder.mutation<Client, UpdateClient>({
                query: ({ companyId, id, data }) => ({
                    url: `/${id}/update`,
                    method: 'PATCH',
                    data,
                    params: { companyId },
                }),
                invalidatesTags: (_resp, _err, { id }) => [
                    { type: 'clients', id },
                    { type: 'clients', id: 'LIST' },
                ],
            }),

            uploadAvatar: builder.mutation<{ url: string }, UploadAvatar>({
                query: ({ companyId, id, data }) => ({
                    url: `/${id}/update/avatar`,
                    method: 'POST',
                    data,
                    params: { companyId },
                }),
                invalidatesTags: (_resp, _err, { id }) => [
                    { type: 'clients', id },
                    { type: 'clients', id: 'LIST' },
                ],
            }),

            delete: builder.mutation<{ message: string }, { companyId: number; id: number }>({
                query: ({ companyId, id }) => ({
                    url: `/${id}/delete`,
                    method: 'DELETE',
                    params: { companyId },
                }),
                invalidatesTags: (_resp, _err, { id }) => [
                    { type: 'clients', id },
                    { type: 'clients', id: 'LIST' },
                ],
            }),
        };
    },
});

export const {
    useCreateClientMutation,
    useGetAllClientsQuery,
    useGetByIdQuery,
    useUpdateClientMutation,
    useUploadAvatarMutation,
    useDeleteMutation,
    useGetByPhoneQuery,
    useLazyGetByPhoneQuery,
} = clientsApi;
