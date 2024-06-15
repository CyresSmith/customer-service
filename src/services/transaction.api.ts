import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import {
    addChangeBalanceDto,
    addMovingTransactionDto,
    addPurchaseTransactionDto,
    addSalaryTransactionDto,
    addSellTransactionDto,
    addServiceTransactionDto,
    GetTransactionsParams,
    GetTransactionsPeriodParams,
    TransactionBasicInfo,
} from './types/transaction.types';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',

    baseQuery: axiosBaseQuery('transaction') as BaseQueryFn,

    tagTypes: ['transaction', 'cashbox'],

    endpoints: builder => ({
        addServiceTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addServiceTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/service`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        addSellTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addSellTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/sell`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        addMovingTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addMovingTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/moving`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        addPurchaseTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addPurchaseTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/purchase`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        addSalaryTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addSalaryTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/salary`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        addChangeBalanceTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addChangeBalanceDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/change-balance`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),

        getTransactionsByParams: builder.query<TransactionBasicInfo[], GetTransactionsParams>({
            query: params => ({
                url: ``,
                method: 'GET',
                params,
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'transaction' as const, id })),
                          { type: 'transaction', id: 'LIST' },
                      ]
                    : [{ type: 'transaction', id: 'LIST' }],
        }),

        getTransactionsByPeriod: builder.query<TransactionBasicInfo[], GetTransactionsPeriodParams>(
            {
                query: params => ({
                    url: `/get-all`,
                    method: 'GET',
                    params,
                }),
                providesTags: resp =>
                    resp
                        ? [
                              ...resp.map(({ id }) => ({ type: 'transaction' as const, id })),
                              { type: 'transaction', id: 'LIST' },
                          ]
                        : [{ type: 'transaction', id: 'LIST' }],
            }
        ),
    }),
});

export const {
    useAddServiceTransactionMutation,
    useAddSellTransactionMutation,
    useAddMovingTransactionMutation,
    useAddPurchaseTransactionMutation,
    useAddSalaryTransactionMutation,
    useAddChangeBalanceTransactionMutation,
    useGetTransactionsByParamsQuery,
    useLazyGetTransactionsByParamsQuery,
    useGetTransactionsByPeriodQuery,
    useLazyGetTransactionsByPeriodQuery,
} = transactionApi;
