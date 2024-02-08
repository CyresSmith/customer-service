import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./instance";
import { Client, CreateResponse } from "store/clients/clients.types";

export const clientsApi = createApi({
    reducerPath: 'clientsApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['clientsApi'],

    endpoints: builder => ({

        createClient: builder.mutation<CreateResponse, Partial<Client>>({
            query: data => ({
                url: '/clients/create',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['clientsApi'],
        }),
    }),
});

export const {
    useCreateClientMutation,
} = clientsApi;