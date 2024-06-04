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

    baseQuery: axiosBaseQuery('company') as BaseQueryFn,

    tagTypes: ['companies'],

    endpoints: builder => ({
        createCompany: builder.mutation<Company, CreateCompany>({
            query: data => ({
                url: '/register',
                method: 'POST',
                data,
            }),
            invalidatesTags: resp =>
                resp
                    ? [
                          { type: 'companies', id: resp.id },
                          { type: 'companies', id: 'LIST' },
                      ]
                    : [{ type: 'companies', id: 'LIST' }],
        }),

        getCompanyById: builder.query<Company, { companyId: string | undefined }>({
            query: ({ companyId }) =>
                companyId && {
                    url: `/${companyId}`,
                    method: 'GET',
                },
            providesTags: (_resp, _err, { companyId: id }) => [{ type: 'companies', id }],
        }),

        getCompanyProfile: builder.query<Company, number>({
            query: id => ({
                url: `/${id}/profile`,
                method: 'GET',
            }),
            providesTags: (_resp, _err, id) => [{ type: 'companies', id }],
        }),

        updateCompanyProfile: builder.mutation<{ message: string }, IUpdateCompanyProfile>({
            query: ({ id, data }) => ({
                url: `/${id}/profile`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: (_resp, _err, { id }) => [
                { type: 'companies', id },
                { type: 'companies', id: 'LIST' },
            ],
        }),

        getCompanyActivities: builder.query<Activity[], number>({
            query: id => ({
                url: `/${id}/activities`,
                method: 'GET',
            }),
            providesTags: (_resp, _err, id) => [{ type: 'companies', id }],
        }),

        uploadCompanyAvatar: builder.mutation<{ url: string }, UpdateAvatar>({
            query: ({ id, data }) => ({
                url: `/${id}/profile/avatar`,
                method: 'POST',
                data,
            }),
            invalidatesTags: (_resp, _err, { id }) => [
                { type: 'companies', id },
                { type: 'companies', id: 'LIST' },
            ],
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
