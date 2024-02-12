import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./instance";
import { AddClient, Client, UpdateClient, UploadAvatar } from "store/clients/clients.types";

export const clientsApi = createApi({
    reducerPath: 'clientsApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['clientsApi'],

    endpoints: builder => {
        return ({
            createClient: builder.mutation<Client, AddClient>({
                query: ({ data, companyId }) => ({
                    url: `clients/${companyId}/create`,
                    method: 'POST',
                    data,
                }),
                invalidatesTags: ['clientsApi'],
            }),

            getAll: builder.query<Client[], unknown>({
                query: (companyId: number) => ({
                    url: `clients/${companyId}/get-all`,
                    method: 'GET',
                }),
            }),

            getById: builder.query<Client, { companyId: number, id: number }>({
                query: ({ companyId, id }) => ({
                    url: `clients/${companyId}/${id}`,
                    method: 'GET'
                })
            }),

            updateClient: builder.mutation<Client, UpdateClient>({
                query: ({ companyId, id, data }) => ({
                    url: `clients/${companyId}/${id}/update`,
                    method: 'PATCH',
                    data,
                }),
                invalidatesTags: ['clientsApi'],
            }),

            uploadAvatar: builder.mutation<{ url: string }, UploadAvatar>({
                query: ({ companyId, id, data }) => ({
                    url: `clients/${companyId}/${id}/update/avatar`,
                    method: 'POST',
                    data,
                }),
                invalidatesTags: ['clientsApi'],
                }),
        });
    },
});

export const {
    useCreateClientMutation,
    useGetAllQuery,
    useGetByIdQuery,
    useUpdateClientMutation,
    useUploadAvatarMutation,
} = clientsApi;