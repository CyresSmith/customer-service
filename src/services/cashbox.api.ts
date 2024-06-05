import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { MessageResponse } from './types';
import {
    Cashbox,
    CashboxBasicInfo,
    CreateCashboxDto,
    UpdateCashboxDto,
} from './types/cashbox.types';

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

        getCashboxById: builder.query<Cashbox, { companyId: number; id: number }>({
            query: ({ companyId, id }) => ({
                url: `/${id}`,
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
                url: `/${id}`,
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
} = cashboxApi;
