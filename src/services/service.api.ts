import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import {
  IAddNewServiceDto,
  IService,
  IServiceUpdate,
  ServiceBasicInfo,
} from './types/service.type';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['services'],

  endpoints: builder => ({
    addNewService: builder.mutation<ServiceBasicInfo, IAddNewServiceDto>({
      query: ({ companyId, data }) => ({
        url: `/service`,
        method: 'POST',
        data,
        params: { companyId },
      }),
      invalidatesTags: ['services'],
    }),

    getServices: builder.query<ServiceBasicInfo[], { companyId: string }>({
      query: ({ companyId }) => ({
        url: `/service/get-all`,
        method: 'GET',
        params: { companyId },
      }),
    }),

    uploadServiceAvatar: builder.mutation<
      { url: string },
      { companyId: number; serviceId: number; data: FormData }
    >({
      query: ({ companyId, serviceId, data }) => ({
        url: `service/${serviceId}/avatar`,
        method: 'PATCH',
        data,
        params: { companyId },
      }),
      invalidatesTags: ['services'],
    }),

    getServiceData: builder.query<
      IService,
      { companyId: number; serviceId: number }
    >({
      query: ({ companyId, serviceId }) => ({
        url: `service/${serviceId}`,
        params: { companyId },
        method: 'GET',
      }),
    }),

    updateServiceData: builder.mutation<
      { message: string },
      { companyId: number; serviceId: number; data: Partial<IServiceUpdate> }
    >({
      query: ({ companyId, serviceId, data }) => ({
        url: `service/${serviceId}`,
        method: 'PATCH',
        params: { companyId },
        data,
      }),
      invalidatesTags: ['services'],
    }),

    deleteService: builder.mutation<
      { message: string },
      { companyId: string; serviceId: number | string }
    >({
      query: ({ companyId, serviceId }) => ({
        url: `service/${serviceId}`,
        method: 'DELETE',
        params: { companyId },
      }),
      invalidatesTags: ['services'],
    }),
  }),
});

export const {
  useUpdateServiceDataMutation,
  useUploadServiceAvatarMutation,
  useAddNewServiceMutation,
  useGetServicesQuery,
  useGetServiceDataQuery,
  useDeleteServiceMutation,
} = serviceApi;
