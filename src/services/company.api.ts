import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { CreateCompanyDto } from 'services/types/company.types';
import { CompanyCategory } from './types/category.types';
import { Company } from './types/company.types';

export const companyApi = createApi({
  reducerPath: 'companyApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['companyApi'],

  endpoints: builder => ({
    getCompanyCategories: builder.query<CompanyCategory[], null>({
      query: () => ({
        url: `/category/company`,
        method: 'GET',
      }),
    }),

    createCompany: builder.mutation<Company, CreateCompanyDto>({
      query: data => ({
        url: '/company',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),

    getCompanyById: builder.query<Company, number>({
      query: id => ({
        url: `/company/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCompanyCategoriesQuery,
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
} = companyApi;
