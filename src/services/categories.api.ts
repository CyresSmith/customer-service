import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { ServiceTypeEnum } from 'helpers/enums';
import { axiosBaseQuery } from 'services/instance';
import { Category, CompanyCategory, ServiceCategory } from './types/category.types';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',

    baseQuery: axiosBaseQuery('category') as BaseQueryFn,

    tagTypes: ['servicesCategories', 'companyCategories'],

    endpoints: builder => ({
        getServicesCategories: builder.query<ServiceCategory[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: `/services`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'servicesCategories' as const, id })),
                          { type: 'servicesCategories', id: 'LIST' },
                      ]
                    : [{ type: 'servicesCategories', id: 'LIST' }],
        }),

        addServiceCategory: builder.mutation<
            Category,
            { companyId: number; data: { name: string; type: ServiceTypeEnum } }
        >({
            query: ({ companyId, data }) => ({
                url: `/services`,
                method: 'POST',
                params: { companyId },
                data,
            }),
            invalidatesTags: [{ type: 'servicesCategories', id: 'LIST' }],
        }),

        getCompanyCategories: builder.query<CompanyCategory[], null>({
            query: () => ({
                url: `/company`,
                method: 'GET',
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'companyCategories' as const, id })),
                          { type: 'companyCategories', id: 'LIST' },
                      ]
                    : [{ type: 'companyCategories', id: 'LIST' }],
        }),
    }),
});

export const {
    useLazyGetServicesCategoriesQuery,
    useGetServicesCategoriesQuery,
    useAddServiceCategoryMutation,
    useGetCompanyCategoriesQuery,
} = categoriesApi;
