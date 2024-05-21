import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { UserData } from 'store/user/user.types';
// import { MessageResponse } from './types';
import {
    BasicEmployeeInfo,
    IEmployee,
    UpdateEmployeeAvatar,
    UpdateEmployeeProfile,
    addExistUserEmployeeData,
    addNewUserEmployeeData,
} from './types/employee.types';
// import {
//     IGetEmployeeSchedule,
//     IMonthSchedule,
//     IUpdateEmployeeSchedule,
// } from './types/schedule.types';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['employees'],

    endpoints: builder => ({
        findUserData: builder.mutation<UserData, { companyId: number; email: string }>({
            query: ({ companyId, email }) => ({
                url: `employees/find-employee-data`,
                method: 'POST',
                data: { email },
                params: { companyId },
            }),
            invalidatesTags: result => [{ type: 'employees', id: result?.id }],
        }),

        addExistUserEmployee: builder.mutation<IEmployee, addExistUserEmployeeData>({
            query: ({ companyId, data }) => ({
                url: `employees/add-exist-user-employee`,
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
                url: `employees/add-new-user-employee`,
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
                url: `employees/${id}/get-one`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: (_result, _err, { id }) => [{ type: 'employees', id }],
        }),

        getCompanyEmployees: builder.query<BasicEmployeeInfo[], number | null>({
            query: companyId => {
                if (!companyId) return;

                return {
                    url: `employees/get-all-company-employees`,
                    method: 'GET',
                    params: { companyId },
                };
            },
            providesTags: () => [{ type: 'employees', id: 'LIST' }],
        }),

        uploadEmployeeAvatar: builder.mutation<{ url: string }, UpdateEmployeeAvatar>({
            query: ({ companyId, employeeId, data }) => ({
                url: `employees/${employeeId}/update/avatar`,
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
                url: `employees/${employeeId}/update`,
                method: 'PATCH',
                data,
                params: { companyId },
            }),
            invalidatesTags: (_result, _err, { employeeId: id }) => [
                { type: 'employees', id },
                { type: 'employees', id: 'LIST' },
            ],
        }),

        // updateEmployeeSchedule: builder.mutation<MessageResponse, IUpdateEmployeeSchedule>({
        //     query: ({ companyId, employeeId, data }) => ({
        //         url: `company/${companyId}/employee/${employeeId}/schedule`,
        //         method: 'PATCH',
        //         data,
        //     }),
        //     invalidatesTags: (_result, _err, arg) => [{ type: 'employee', id: arg.employeeId }],
        // }),

        // getEmployeeSchedule: builder.query<IMonthSchedule, IGetEmployeeSchedule>({
        //     query: ({ companyId, employeeId, year, month }) => ({
        //         url: `company/${companyId}/employee/${employeeId}/schedule?year=${year}&month=${month}`,
        //         method: 'GET',
        //     }),
        //     providesTags: (_result, _err, arg) => [{ type: 'employee', id: arg.employeeId }],
        // }),

        // deleteEmployeeSchedule: builder.mutation<
        //     { message: string },
        //     { companyId: number; employeeId: number; scheduleId: number }
        // >({
        //     query: ({ companyId, employeeId, scheduleId }) => ({
        //         url: `company/${companyId}/employee/${employeeId}/schedule/${scheduleId}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: (_result, _err, arg) => [{ type: 'employee', id: arg.employeeId }],
        // }),

        removeEmployeeService: builder.mutation<
            { message: string },
            { companyId: number; employeeId: number; serviceId: number }
        >({
            query: ({ companyId, employeeId, serviceId }) => ({
                url: `employees/${employeeId}/service/${serviceId}`,
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
                url: `employees/${employeeId}/service`,
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
                url: `employees/${employeeId}`,
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
