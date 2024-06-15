import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { AddTransactionCategoryDto, TransactionCategoryBasicInfo } from './types/transaction.types';

export const transactionCategoryApi = createApi({
    reducerPath: 'transactionCategoryApi',

    baseQuery: axiosBaseQuery('transaction-category') as BaseQueryFn,

    tagTypes: ['transactionCategory'],

    endpoints: builder => ({
        addTransactionCategory: builder.mutation<
            TransactionCategoryBasicInfo,
            { data: AddTransactionCategoryDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: ``,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'transactionCategory', id: 'LIST' }],
        }),

        getTransactionCategories: builder.query<
            TransactionCategoryBasicInfo[],
            { companyId: number }
        >({
            query: params => ({
                url: ``,
                method: 'GET',
                params,
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'transactionCategory' as const, id })),
                          { type: 'transactionCategory', id: 'LIST' },
                      ]
                    : [{ type: 'transactionCategory', id: 'LIST' }],
        }),
    }),
});

export const { useAddTransactionCategoryMutation, useGetTransactionCategoriesQuery } =
    transactionCategoryApi;
