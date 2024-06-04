import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { CashboxBasicInfo, CreateCashboxDto } from './types/cashbox.types';

export const cashboxApi = createApi({
    reducerPath: 'cashboxApi',

    baseQuery: axiosBaseQuery('cashbox') as BaseQueryFn,

    tagTypes: ['cashbox'],

    endpoints: builder => ({
        addCashbox: builder.mutation<
            CashboxBasicInfo,
            { data: CreateCashboxDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: '',
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'cashbox', id: 'LIST' }],
        }),

        getCashboxes: builder.query<CashboxBasicInfo[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: '',
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'cashbox' as const, id })),
                          { type: 'cashbox', id: 'LIST' },
                      ]
                    : [{ type: 'cashbox', id: 'LIST' }],
        }),
    }),
});

export const { useAddCashboxMutation, useGetCashboxesQuery } = cashboxApi;
