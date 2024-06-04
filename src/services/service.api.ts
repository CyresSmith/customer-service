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

    baseQuery: axiosBaseQuery('service') as BaseQueryFn,

    tagTypes: ['service'],

    endpoints: builder => ({
        addNewService: builder.mutation<ServiceBasicInfo, IAddNewServiceDto>({
            query: ({ companyId, data }) => ({
                url: ``,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: [{ type: 'service', id: 'LIST' }],
        }),

        getServices: builder.query<ServiceBasicInfo[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: `/get-all`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'service' as const, id })),
                          { type: 'service', id: 'LIST' },
                      ]
                    : [{ type: 'service', id: 'LIST' }],
        }),

        getEmployeeServices: builder.query<
            ServiceBasicInfo[],
            { companyId: number; employeeId: number }
        >({
            query: ({ companyId, employeeId }) => ({
                url: `/employee`,
                method: 'GET',
                params: { companyId, employeeId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'service' as const, id })),
                          { type: 'service', id: 'LIST' },
                      ]
                    : [{ type: 'service', id: 'LIST' }],
        }),

        uploadServiceAvatar: builder.mutation<
            { url: string },
            { companyId: number; serviceId: number; data: FormData }
        >({
            query: ({ companyId, serviceId, data }) => ({
                url: `/${serviceId}/avatar`,
                method: 'PATCH',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_resp, _err, { serviceId: id }) => [
                { type: 'service', id },
                { type: 'service', id: 'LIST' },
            ],
        }),

        getServiceData: builder.query<IService, { companyId: number; serviceId: number }>({
            query: ({ companyId, serviceId }) => ({
                url: `/${serviceId}`,
                params: { companyId },
                method: 'GET',
            }),
            providesTags: (_resp, _err, { serviceId: id }) => [{ type: 'service', id }],
        }),

        updateServiceData: builder.mutation<
            { message: string },
            { companyId: number; serviceId: number; data: Partial<IServiceUpdate> }
        >({
            query: ({ companyId, serviceId, data }) => ({
                url: `/${serviceId}`,
                method: 'PATCH',
                params: { companyId },
                data,
            }),
            invalidatesTags: (_resp, _err, { serviceId: id }) => [
                { type: 'service', id },
                { type: 'service', id: 'LIST' },
            ],
        }),

        deleteService: builder.mutation<
            { message: string },
            { companyId: number; serviceId: number }
        >({
            query: ({ companyId, serviceId }) => ({
                url: `/${serviceId}`,
                method: 'DELETE',
                params: { companyId },
            }),
            invalidatesTags: (_resp, _err, { serviceId: id }) => [
                { type: 'service', id },
                { type: 'service', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useUpdateServiceDataMutation,
    useUploadServiceAvatarMutation,
    useAddNewServiceMutation,
    useGetServicesQuery,
    useLazyGetServicesQuery,
    useGetServiceDataQuery,
    useDeleteServiceMutation,
    useGetEmployeeServicesQuery,
} = serviceApi;
