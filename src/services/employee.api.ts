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

  tagTypes: ['employeeApi', 'employeeSchedule'],

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
      invalidatesTags: ['employeeApi'],
    }),

    addExistUserEmployee: builder.mutation<IEmployee, addExistUserEmployeeData>(
      {
        query: ({ companyId, data }) => ({
          url: `employees/add-exist-user-employee`,
          method: 'POST',
          data,
          params: { companyId },
        }),
        invalidatesTags: ['employeeApi'],
      }
    ),

    addNewUserEmployee: builder.mutation<IEmployee, addNewUserEmployeeData>({
      query: ({ companyId, data }) => ({
        url: `employees/add-new-user-employee`,
        method: 'POST',
        data,
        params: { companyId },
      }),
      invalidatesTags: ['employeeApi'],
    }),

    getOneEmployee: builder.query<IEmployee, { companyId: number; id: number }>(
      {
        query: ({ companyId, id }) => ({
          url: `employees/get-one/${id}`,
          method: 'GET',
          params: { companyId },
        }),
      }
    ),

    getCompanyEmployees: builder.query<BasicEmployeeInfo[], number>({
      query: companyId => ({
        url: `employees/get-all-from-company`,
        method: 'GET',
        params: { companyId },
      }),
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
      invalidatesTags: ['employeeApi'],
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
      invalidatesTags: ['employeeApi'],
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
      invalidatesTags: ['employeeSchedule'],
    }),

    getEmployeeSchedule: builder.query<IMonthSchedule, IGetEmployeeSchedule>({
      query: ({ companyId, employeeId, year, month }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule?year=${year}&month=${month}`,
        method: 'GET',
      }),
    }),

    deleteEmployeeSchedule: builder.mutation<
      { message: string },
      { companyId: number; employeeId: number; scheduleId: number }
    >({
      query: ({ companyId, employeeId, scheduleId }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule/${scheduleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeSchedule'],
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
      invalidatesTags: ['employeeApi'],
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
      invalidatesTags: ['employeeApi'],
    }),
  }),
});

export const {
  useFindUserDataMutation,
  useAddExistUserEmployeeMutation,
  useAddNewUserEmployeeMutation,
  useUploadEmployeeAvatarMutation,
  useUpdateEmployeeProfileMutation,
  useUpdateEmployeeScheduleMutation,
  useGetEmployeeScheduleQuery,
  useDeleteEmployeeScheduleMutation,
  useGetCompanyEmployeesQuery,
  useGetOneEmployeeQuery,
  useRemoveEmployeeServiceMutation,
  useAddEmployeeServiceMutation,
} = employeeApi;
