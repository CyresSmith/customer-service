import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { ServiceTypeEnum } from 'helpers/enums';
import { axiosBaseQuery } from 'services/instance';
import {
  Category,
  CompanyCategory,
  ServiceCategory,
} from './types/category.types';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['servicesCategories', 'companyCategories'],

  endpoints: builder => ({
    getServicesCategories: builder.query<
      ServiceCategory[],
      { companyId: number }
    >({
      query: ({ companyId }) => ({
        url: `category/services`,
        method: 'GET',
        params: { companyId },
      }),
      providesTags: result =>
        result
          ? result.map(item => ({ type: 'servicesCategories', id: item.id }))
          : ['servicesCategories'],
    }),

    addServiceCategory: builder.mutation<
      Category,
      { companyId: number; data: { name: string; type: ServiceTypeEnum } }
    >({
      query: ({ companyId, data }) => ({
        url: `category/services`,
        method: 'POST',
        params: { companyId },
        data,
      }),
      invalidatesTags: ['servicesCategories'],
    }),

    getCompanyCategories: builder.query<CompanyCategory[], null>({
      query: () => ({
        url: `/category/company`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? result.map(item => ({ type: 'companyCategories', id: item.id }))
          : ['companyCategories'],
    }),
  }),
});

export const {
  useGetServicesCategoriesQuery,
  useAddServiceCategoryMutation,
  useGetCompanyCategoriesQuery,
} = categoriesApi;
