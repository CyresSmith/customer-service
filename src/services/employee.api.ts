import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/instance';
import { UserData } from 'store/user/user.types';
import {
  BasicEmployeeInfo,
  IEmployee,
  UpdateEmployeeAvatar,
  UpdateEmployeeProfile,
  addExistUserEmployeeData,
  addNewUserEmployeeData,
} from './types/employee.types';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',

  baseQuery: axiosBaseQuery() as BaseQueryFn,

  tagTypes: ['employeeApi'],

  endpoints: builder => ({
    findUserData: builder.mutation<
      UserData,
      { companyId: string; email: string }
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

    getOne: builder.query<IEmployee, { companyId: number; id: number }>({
      query: ({ companyId, id }) => ({
        url: `employees/get-one/${id}`,
        method: 'GET',
        params: { companyId },
      }),
    }),

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
        url: `employees/update/${employeeId}/avatar`,
        method: 'PATCH',
        data,
        params: { companyId },
      }),
      invalidatesTags: ['employeeApi'],
    }),

    updateEmployeeProfile: builder.mutation<
      IEmployee,
      { companyId: string; employeeId: string; data: UpdateEmployeeProfile }
    >({
      query: ({ companyId, employeeId, data }) => ({
        url: `employees/update/${employeeId}`,
        method: 'PATCH',
        data,
        params: { companyId },
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
  useGetCompanyEmployeesQuery,
  useGetOneQuery,
} = employeeApi;
