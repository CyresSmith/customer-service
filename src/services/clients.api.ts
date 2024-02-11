import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./instance";
import { AddClient, Client } from "store/clients/clients.types";

export const clientsApi = createApi({
    reducerPath: 'clientsApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['clientsApi'],

    endpoints: builder => ({

        createClient: builder.mutation<Client, AddClient>({
            query: ({data, companyId}) => ({
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
    }),
});

export const {
    useCreateClientMutation,
    useGetAllQuery
} = clientsApi;