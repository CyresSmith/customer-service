import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import {
  Activity,
  Company,
  CreateCompany,
  IUpdateCompanyProfile,
  UpdateAvatar,
} from '../store/company/company.types';

export const companyApi = createApi({
  reducerPath: 'companyApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['company'],

  endpoints: builder => ({
    createCompany: builder.mutation<Company, CreateCompany>({
      query: data => ({
        url: '/company/register',
        method: 'POST',
        data,
      }),
      invalidatesTags: resp =>
        resp ? [{ type: 'company', id: resp.id }] : ['company'],
    }),

    getCompanyById: builder.query<Company, { companyId: string | undefined }>({
      query: ({ companyId }) =>
        companyId && {
          url: `/company/${companyId}`,
          method: 'GET',
        },
      providesTags: (resp, err, arg) => [
        { type: 'company', id: arg.companyId },
      ],
    }),

    getCompanyProfile: builder.query<Company, number>({
      query: id => ({
        url: `/company/${id}/profile`,
        method: 'GET',
      }),
      providesTags: (resp, err, id) => [{ type: 'company', id }],
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
      invalidatesTags: (resp, err, arg) => [{ type: 'company', id: arg.id }],
    }),

    getCompanyActivities: builder.query<Activity[], number>({
      query: id => ({
        url: `/company/${id}/activities`,
        method: 'GET',
      }),
      providesTags: (resp, err, id) => [{ type: 'company', id }],
    }),

    uploadCompanyAvatar: builder.mutation<{ url: string }, UpdateAvatar>({
      query: ({ id, data }) => ({
        url: `/company/${id}/profile/avatar`,
        method: 'POST',
        data,
      }),
      invalidatesTags: (resp, err, arg) => [{ type: 'company', id: arg.id }],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useGetCompanyProfileQuery,
  useUploadCompanyAvatarMutation,
  useUpdateCompanyProfileMutation,
  useGetCompanyActivitiesQuery,
} = companyApi;
