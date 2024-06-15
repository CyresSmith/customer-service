import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { MessageResponse } from './types';
import {
    Cashbox,
    CashboxBasicInfo,
    CreateCashboxDto,
    UpdateCashboxDto,
} from './types/cashbox.types';
import {
    GetTransactionsParams,
    TransactionBasicInfo,
    addChangeBalanceDto,
    addMovingTransactionDto,
    addPurchaseTransactionDto,
    addSalaryTransactionDto,
    addSellTransactionDto,
    addServiceTransactionDto,
} from './types/transaction.types';

export const cashboxApi = createApi({
    reducerPath: 'cashboxApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['cashbox', 'transaction'],

    endpoints: builder => ({
        addCashbox: builder.mutation<
            CashboxBasicInfo,
            { data: CreateCashboxDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: '/cashbox',
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'cashbox', id: 'LIST' }],
        }),

        getCashboxes: builder.query<CashboxBasicInfo[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: '/cashbox',
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

        getCashboxById: builder.query<Cashbox, { companyId: number; id: number }>({
            query: ({ companyId, id }) => ({
                url: `/cashbox/${id}`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          { type: 'cashbox', id: resp.id },
                          { type: 'cashbox', id: 'LIST' },
                      ]
                    : [{ type: 'cashbox', id: 'LIST' }],
        }),

        updateCashbox: builder.mutation<
            MessageResponse,
            { companyId: number; id: number; data: UpdateCashboxDto }
        >({
            query: ({ companyId, id, data }) => ({
                url: `/cashbox/${id}`,
                data,
                method: 'PATCH',
                params: { companyId },
            }),
            invalidatesTags: resp =>
                resp
                    ? [
                          { type: 'cashbox', id: resp.id },
                          { type: 'cashbox', id: 'LIST' },
                      ]
                    : [{ type: 'cashbox', id: 'LIST' }],
        }),

        addServiceTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addServiceTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/transaction/service`,
                method: 'POST',
                data,
                params: { companyId },
            }),

            invalidatesTags: (_res, _err, { data }) => [
                { type: 'cashbox', id: data.cashbox },
                { type: 'transaction', id: 'LIST' },
            ],
        }),

        addSellTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addSellTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/transaction/sell`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_res, _err, { data }) => [
                { type: 'cashbox', id: data.cashbox },
                { type: 'transaction', id: 'LIST' },
            ],
        }),

        addMovingTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addMovingTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/transaction/moving`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_res, _err, { data }) => [
                { type: 'cashbox', id: data.cashbox },
                { type: 'cashbox', id: data.fromCashboxId },
                { type: 'transaction', id: 'LIST' },
            ],
        }),

        addPurchaseTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addPurchaseTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/transaction/purchase`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_res, _err, { data }) => [
                { type: 'cashbox', id: data.cashbox },
                { type: 'transaction', id: 'LIST' },
            ],
        }),

        addSalaryTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addSalaryTransactionDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/transaction/salary`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_res, _err, { data }) => [
                { type: 'cashbox', id: data.cashbox },
                { type: 'transaction', id: 'LIST' },
            ],
        }),

        addChangeBalanceTransaction: builder.mutation<
            TransactionBasicInfo,
            { data: addChangeBalanceDto; companyId: number }
        >({
            query: ({ companyId, data }) => ({
                url: `/transaction/change-balance`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_res, _err, { data }) => [
                { type: 'cashbox', id: data.cashbox },
                { type: 'transaction', id: 'LIST' },
            ],
        }),

        getTransactionsByParams: builder.query<TransactionBasicInfo[], GetTransactionsParams>({
            query: params => ({
                url: `/transaction`,
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

        removeCashbox: builder.mutation<MessageResponse, { companyId: number; id: number }>({
            query: ({ companyId, id }) => ({
                url: `/${id}`,
                method: 'DELETE',
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'cashbox', id: 'LIST' }],
        }),
    }),
});

export const {
    useAddCashboxMutation,
    useGetCashboxesQuery,
    useRemoveCashboxMutation,
    useGetCashboxByIdQuery,
    useUpdateCashboxMutation,
    useAddServiceTransactionMutation,
    useAddSellTransactionMutation,
    useAddMovingTransactionMutation,
    useAddPurchaseTransactionMutation,
    useAddSalaryTransactionMutation,
    useAddChangeBalanceTransactionMutation,
    useGetTransactionsByParamsQuery,
} = cashboxApi;
