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
            invalidatesTags: [{ type: 'services', id: 'LIST' }],
        }),

        getServices: builder.query<ServiceBasicInfo[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: `/service/get-all`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'services' as const, id })),
                          { type: 'services', id: 'LIST' },
                      ]
                    : [{ type: 'services', id: 'LIST' }],
        }),

        getEmployeeServices: builder.query<
            ServiceBasicInfo[],
            { companyId: number; employeeId: number }
        >({
            query: ({ companyId, employeeId }) => ({
                url: `/service/employee`,
                method: 'GET',
                params: { companyId, employeeId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'services' as const, id })),
                          { type: 'services', id: 'LIST' },
                      ]
                    : [{ type: 'services', id: 'LIST' }],
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
            invalidatesTags: (_resp, _err, { serviceId: id }) => [
                { type: 'services', id },
                { type: 'services', id: 'LIST' },
            ],
        }),

        getServiceData: builder.query<IService, { companyId: number; serviceId: number }>({
            query: ({ companyId, serviceId }) => ({
                url: `service/${serviceId}`,
                params: { companyId },
                method: 'GET',
            }),
            providesTags: (_resp, _err, { serviceId: id }) => [{ type: 'services', id }],
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
            invalidatesTags: (_resp, _err, { serviceId: id }) => [
                { type: 'services', id },
                { type: 'services', id: 'LIST' },
            ],
        }),

        deleteService: builder.mutation<
            { message: string },
            { companyId: number; serviceId: number }
        >({
            query: ({ companyId, serviceId }) => ({
                url: `service/${serviceId}`,
                method: 'DELETE',
                params: { companyId },
            }),
            invalidatesTags: (_resp, _err, { serviceId: id }) => [
                { type: 'services', id },
                { type: 'services', id: 'LIST' },
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
