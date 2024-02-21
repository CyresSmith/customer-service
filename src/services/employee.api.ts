import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import {
  UpdateEmployeeAvatar,
  UpdateEmployeeProfile,
} from './types/employee.types';
import { IEmployeeSchedule } from './types/schedule.types';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['employeeApi', 'employeeSchedule'],

  endpoints: builder => ({
    uploadEmployeeAvatar: builder.mutation<
      { url: string },
      UpdateEmployeeAvatar
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `company/${companyId}/employee/${employeeId}/avatar`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['employeeApi'],
    }),

    updateEmployeeProfile: builder.mutation<
      { message: string },
      { companyId: string; employeeId: string; data: UpdateEmployeeProfile }
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `company/${companyId}/employee/${employeeId}/profile`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['employeeApi'],
    }),

    updateEmployeeSchedule: builder.mutation<
      { message: string },
      { companyId: string; employeeId: string; data: IEmployeeSchedule }
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['employeeSchedule'],
    }),

    getEmployeeSchedule: builder.query<
      IEmployeeSchedule,
      { companyId: string; employeeId: string; year: number; month: number }
    >({
      query: ({ companyId, employeeId, year, month }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule?year=${year}&month=${month}`,
        method: 'GET',
      }),
    }),

    deleteEmployeeSchedule: builder.mutation<
      { message: string },
      { companyId: string; employeeId: string; scheduleId: string }
    >({
      query: ({ companyId, employeeId, scheduleId }) => ({
        url: `company/${companyId}/employee/${employeeId}/schedule/${scheduleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeSchedule'],
    }),
  }),
});

export const {
  useUploadEmployeeAvatarMutation,
  useUpdateEmployeeProfileMutation,
  useUpdateEmployeeScheduleMutation,
  useGetEmployeeScheduleQuery,
  useDeleteEmployeeScheduleMutation,
} = employeeApi;
