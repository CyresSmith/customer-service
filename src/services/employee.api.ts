import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { UserData } from 'store/user/user.types';
// import { MessageResponse } from './types';
import {
    EmployeeBasicInfo,
    IEmployee,
    UpdateEmployeeAvatar,
    UpdateEmployeeProfile,
    addExistUserEmployeeData,
    addNewUserEmployeeData,
} from './types/employee.types';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',

    baseQuery: axiosBaseQuery('employees') as BaseQueryFn,

    tagTypes: ['employees'],

    endpoints: builder => ({
        findUserData: builder.mutation<UserData, { companyId: number; email: string }>({
            query: ({ companyId, email }) => ({
                url: `/find-employee-data`,
                method: 'POST',
                data: { email },
                params: { companyId },
            }),
            invalidatesTags: result => [{ type: 'employees', id: result?.id }],
        }),

        addExistUserEmployee: builder.mutation<IEmployee, addExistUserEmployeeData>({
            query: ({ companyId, data }) => ({
                url: `/add-exist-user-employee`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_resp, _err, { companyId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        addNewUserEmployee: builder.mutation<IEmployee, addNewUserEmployeeData>({
            query: ({ companyId, data }) => ({
                url: `/add-new-user-employee`,
                method: 'POST',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_resp, _err, { companyId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        getOneEmployee: builder.query<IEmployee, { companyId: number; id: number }>({
            query: ({ companyId, id }) => ({
                url: `/${id}/get-one`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: (_result, _err, { id }) => [{ type: 'employees', id }],
        }),

        getCompanyEmployees: builder.query<EmployeeBasicInfo[], number | null>({
            query: companyId => {
                if (!companyId) return;

                return {
                    url: `/get-all-company-employees`,
                    method: 'GET',
                    params: { companyId },
                };
            },
            providesTags: () => [{ type: 'employees', id: 'LIST' }],
        }),

        uploadEmployeeAvatar: builder.mutation<{ url: string }, UpdateEmployeeAvatar>({
            query: ({ companyId, employeeId, data }) => ({
                url: `/${employeeId}/update/avatar`,
                method: 'PATCH',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_result, _err, { employeeId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        updateEmployeeProfile: builder.mutation<
            IEmployee,
            { companyId: number; employeeId: number; data: UpdateEmployeeProfile }
        >({
            query: ({ companyId, employeeId, data }) => ({
                url: `/${employeeId}/update`,
                method: 'PATCH',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_result, _err, { employeeId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        removeEmployeeService: builder.mutation<
            { message: string },
            { companyId: number; employeeId: number; serviceId: number }
        >({
            query: ({ companyId, employeeId, serviceId }) => ({
                url: `/${employeeId}/service/${serviceId}`,
                params: { companyId },
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _err, { employeeId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        addEmployeeService: builder.mutation<
            { message: string },
            { companyId: number; employeeId: number; data: { services: number[] } }
        >({
            query: ({ companyId, employeeId, data }) => ({
                url: `/${employeeId}/service`,
                params: { companyId },
                method: 'PATCH',
                data,
            }),
            invalidatesTags: (_result, _err, { employeeId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        deleteEmployee: builder.mutation<
            { message: string },
            { companyId: number; employeeId: number }
        >({
            query: ({ companyId, employeeId }) => ({
                url: `/${employeeId}`,
                params: { companyId },
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'employees', id: 'LIST' }],
        }),
    }),
});

export const {
    useFindUserDataMutation,
    useAddExistUserEmployeeMutation,
    useAddNewUserEmployeeMutation,
    useUploadEmployeeAvatarMutation,
    useUpdateEmployeeProfileMutation,
    useGetCompanyEmployeesQuery,
    useLazyGetCompanyEmployeesQuery,
    useGetOneEmployeeQuery,
    useLazyGetOneEmployeeQuery,
    useRemoveEmployeeServiceMutation,
    useAddEmployeeServiceMutation,
    useDeleteEmployeeMutation,
    // useGetEmployeeScheduleQuery,
    // useLazyGetEmployeeScheduleQuery,
} = employeeApi;
