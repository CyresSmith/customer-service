import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { UpdateEmployeeAvatar } from './types/employee.types';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['employeeApi'],

  endpoints: builder => ({
    // getCompanyCategories: builder.query<CompanyCategory[], null>({
    //   query: () => ({
    //     url: `/category/company`,
    //     method: 'GET',
    //   }),
    // }),

    uploadEmployeeAvatar: builder.mutation<
      { url: string },
      UpdateEmployeeAvatar
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `company/${companyId}/employee/${employeeId}/avatar`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['employeeApi'],
    }),
  }),
});

export const { useUploadEmployeeAvatarMutation } = employeeApi;
