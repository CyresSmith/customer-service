import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { ServiceTypeEnum } from 'helpers/enums';
import { axiosBaseQuery } from 'services/instance';
import {
  Activity,
  Company,
  CreateCompany,
  IUpdateCompanyProfile,
  UpdateAvatar,
} from '../store/company/company.types';
import {
  Category,
  CompanyCategory,
  ServiceCategory,
} from './types/category.types';

import {
  IAddNewServiceDto,
  IService,
  IServiceUpdate,
  ServiceBasicInfo,
} from './types/service.type';

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

    uploadServiceAvatar: builder.mutation<
      { url: string },
      { companyId: number; serviceId: number; data: FormData }
    >({
      query: ({ companyId, serviceId, data }) => ({
        url: `company/${companyId}/service/${serviceId}/avatar`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),

    addNewService: builder.mutation<ServiceBasicInfo, IAddNewServiceDto>({
      query: ({ companyId, data }) => ({
        url: `/company/${companyId}/service`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),

    getServicesCategories: builder.query<ServiceCategory[], { id: string }>({
      query: ({ id }) => ({
        url: `/company/${id}/services-categories`,
        method: 'GET',
      }),
    }),

    getServices: builder.query<ServiceBasicInfo[], { id: string }>({
      query: ({ id }) => ({
        url: `/company/${id}/services`,
        method: 'GET',
      }),
    }),

    addServiceCategory: builder.mutation<
      Category,
      { id: string; data: { name: string; type: ServiceTypeEnum } }
    >({
      query: ({ id, data }) => ({
        url: `/company/${id}/services-categories`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['companyApi'],
    }),

    getServiceData: builder.query<
      IService,
      { companyId: number; serviceId: number }
    >({
      query: ({ companyId, serviceId }) => ({
        url: `/company/${companyId}/service/${serviceId}`,
        method: 'GET',
      }),
    }),

    updateServiceData: builder.mutation<
      { message: string },
      { companyId: number; serviceId: number; data: Partial<IServiceUpdate> }
    >({
      query: ({ companyId, serviceId, data }) => ({
        url: `/company/${companyId}/service/${serviceId}`,
        method: 'PATCH',
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
  useAddNewServiceMutation,
  useGetServicesCategoriesQuery,
  useAddServiceCategoryMutation,
  useGetServicesQuery,
  useUploadServiceAvatarMutation,
  useGetServiceDataQuery,
  useUpdateServiceDataMutation,
} = companyApi;
