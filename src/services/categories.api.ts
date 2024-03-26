import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { ServiceTypeEnum } from 'helpers/enums';
import { axiosBaseQuery } from 'services/instance';
import { Category, ServiceCategory } from './types/category.types';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['categories'],

  endpoints: builder => ({
    getServicesCategories: builder.query<
      ServiceCategory[],
      { companyId: string }
    >({
      query: ({ companyId }) => ({
        url: `category/services`,
        method: 'GET',
        params: { companyId },
      }),
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
      invalidatesTags: ['categories'],
    }),
  }),
});

export const { useGetServicesCategoriesQuery, useAddServiceCategoryMutation } =
  categoriesApi;
