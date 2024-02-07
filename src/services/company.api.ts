import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import {
  Company,
  CreateCompany,
  IUpdateCompanyProfile,
  UpdateAvatar,
} from '../store/company/company.types';
import { Activity, CompanyCategory } from './types/category.types';

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

    createCompany: builder.mutation<Company, CreateCompany>({
      query: data => ({
        url: '/company/register',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),

    getCompanyById: builder.query<Company, string>({
      query: id => ({
        url: `/company/${id}`,
        method: 'GET',
      }),
    }),

    getCompanyProfile: builder.query<Company, string>({
      query: id => ({
        url: `/company/${id}/profile`,
        method: 'GET',
      }),
    }),

    updateCompanyProfile: builder.mutation<
      { message: string },
      IUpdateCompanyProfile
    >({
      query: ({ id, data }) => ({
        url: `/company/${id}/profile`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),

    getCompanyActivities: builder.query<Activity[], string>({
      query: id => ({
        url: `/company/${id}/activities`,
        method: 'GET',
      }),
    }),

    uploadCompanyAvatar: builder.mutation<{ url: string }, UpdateAvatar>({
      query: ({ id, data }) => ({
        url: `/company/${id}/profile/avatar`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),
  }),
});

export const {
  useGetCompanyCategoriesQuery,
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useGetCompanyProfileQuery,
  useUploadCompanyAvatarMutation,
  useUpdateCompanyProfileMutation,
  useGetCompanyActivitiesQuery,
} = companyApi;
