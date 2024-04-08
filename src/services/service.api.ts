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

    tagTypes: ['services', 'service'],

    endpoints: builder => ({
        addNewService: builder.mutation<ServiceBasicInfo, IAddNewServiceDto>({
            query: ({ companyId, data }) => ({
                url: `/service`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: resp => (resp ? [{ type: 'services', id: resp.id }] : ['services']),
        }),

        getServices: builder.query<ServiceBasicInfo[], { companyId: number }>({
            query: ({ companyId }) => ({
                url: `/service/get-all`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp ? resp.map(item => ({ type: 'services', id: item.id })) : ['services'],
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
            invalidatesTags: (_resp, _err, arg) => [
                { type: 'services', id: arg.serviceId },
                { type: 'service', id: arg.serviceId },
            ],
        }),

        getServiceData: builder.query<IService, { companyId: number; serviceId: number }>({
            query: ({ companyId, serviceId }) => ({
                url: `service/${serviceId}`,
                params: { companyId },
                method: 'GET',
            }),
            providesTags: (_resp, _err, arg) => [{ type: 'service', id: arg.serviceId }],
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
            invalidatesTags: (_resp, _err, arg) => [
                { type: 'services', id: arg.serviceId },
                { type: 'service', id: arg.serviceId },
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
            invalidatesTags: (_resp, _err, arg) => [
                { type: 'services', id: arg.serviceId },
                { type: 'service', id: arg.serviceId },
            ],
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
