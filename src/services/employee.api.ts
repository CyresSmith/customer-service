import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { UserData } from 'store/user/user.types';
import { MessageResponse } from './types';
import {
  BasicEmployeeInfo,
  IEmployee,
  UpdateEmployeeAvatar,
  UpdateEmployeeProfile,
  addExistUserEmployeeData,
  addNewUserEmployeeData,
} from './types/employee.types';
import {
  IGetEmployeeSchedule,
  IMonthSchedule,
  IUpdateEmployeeSchedule,
} from './types/schedule.types';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['employee', 'allEmployees'],

  endpoints: builder => ({
    findUserData: builder.mutation<
      UserData,
      { companyId: number; email: string }
    >({
      query: ({ companyId, email }) => ({
        url: `employees/find-employee-data`,
        method: 'POST',
        data: { email },
        params: { companyId },
      }),
      invalidatesTags: result =>
        result ? [{ type: 'employee', id: result?.id }] : ['employee'],
    }),

    addExistUserEmployee: builder.mutation<IEmployee, addExistUserEmployeeData>(
      {
        query: ({ companyId, data }) => ({
          url: `employees/add-exist-user-employee`,
          method: 'POST',
          data,
          params: { companyId },
        }),
        invalidatesTags: result =>
          result ? [{ type: 'employee', id: result?.id }] : ['employee'],
      }
    ),

    addNewUserEmployee: builder.mutation<IEmployee, addNewUserEmployeeData>({
      query: ({ companyId, data }) => ({
        url: `employees/add-new-user-employee`,
        method: 'POST',
        data,
        params: { companyId },
      }),
      invalidatesTags: result =>
        result ? [{ type: 'employee', id: result?.id }] : ['employee'],
    }),

    getOneEmployee: builder.query<IEmployee, { companyId: number; id: number }>(
      {
        query: ({ companyId, id }) => ({
          url: `employees/${id}/get-one`,
          method: 'GET',
          params: { companyId },
        }),
        providesTags: (result, err, arg) => [{ type: 'employee', id: arg.id }],
      }
    ),

    getCompanyEmployees: builder.query<BasicEmployeeInfo[], number>({
      query: companyId => ({
        url: `employees/get-all-from-company`,
        method: 'GET',
        params: { companyId },
      }),
      providesTags: result =>
        result
          ? result.map(item => ({ type: 'allEmployees', id: item.id }))
          : ['allEmployees'],
    }),

    uploadEmployeeAvatar: builder.mutation<
      { url: string },
      UpdateEmployeeAvatar
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `employees/${employeeId}/update/avatar`,
        method: 'PATCH',
        data,
        params: { companyId },
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
        { type: 'allEmployees', id: arg.employeeId },
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
      invalidatesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
        { type: 'allEmployees', id: arg.employeeId },
      ],
    }),

    updateEmployeeSchedule: builder.mutation<
      MessageResponse,
      IUpdateEmployeeSchedule
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
      ],
    }),

    getEmployeeSchedule: builder.query<IMonthSchedule, IGetEmployeeSchedule>({
      query: ({ companyId, employeeId, year, month }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule?year=${year}&month=${month}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
      ],
    }),

    deleteEmployeeSchedule: builder.mutation<
      { message: string },
      { companyId: number; employeeId: number; scheduleId: number }
    >({
      query: ({ companyId, employeeId, scheduleId }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule/${scheduleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
      ],
    }),

    removeEmployeeService: builder.mutation<
      { message: string },
      { companyId: number; employeeId: number; serviceId: number }
    >({
      query: ({ companyId, employeeId, serviceId }) => ({
        url: `employees/${employeeId}/service/${serviceId}`,
        params: { companyId },
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
        { type: 'allEmployees', id: arg.employeeId },
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
      invalidatesTags: (result, err, arg) => [
        { type: 'employee', id: arg.employeeId },
        { type: 'allEmployees', id: arg.employeeId },
      ],
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
  useRemoveEmployeeServiceMutation,
  useAddEmployeeServiceMutation,
} = employeeApi;
