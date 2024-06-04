import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import {
    AddTransactionCategoryDto,
    AddTransactionDto,
    TransactionBasicInfo,
    TransactionCategoryBasicInfo,
} from './types/transaction.types';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['transaction', 'transactionCategory'],

    endpoints: builder => ({
        addTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: AddTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `transaction`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        addTransactionCategory: builder.mutation<
            TransactionCategoryBasicInfo,
            { data: AddTransactionCategoryDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `transaction-category`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        getTransactions: builder.query<TransactionBasicInfo[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: `transaction/get-all`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'transaction' as const, id })),
                          { type: 'transaction', id: 'LIST' },
                      ]
                    : [{ type: 'transaction', id: 'LIST' }],
        }),
    }),
});

export const { useAddTransactionMutation, useGetTransactionsQuery } = transactionApi;
