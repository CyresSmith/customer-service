import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './instance';
import { MessageResponse } from './types';
import {
    DeletingSchedule,
    IGetEmployeeSchedule,
    IMonthSchedule,
    IUpdateEmployeeSchedule,
} from './types/schedule.types';

export const schedulesApi = createApi({
    reducerPath: 'schedulesApi',

    baseQuery: axiosBaseQuery('schedules') as BaseQueryFn,

    tagTypes: ['schedules'],

    endpoints: builder => ({
        getAllCompanySchedules: builder.query<
            IMonthSchedule[],
            { companyId: number; year: number; month: number }
        >({
            query: ({ companyId, year, month }) => ({
                url: `/get-all`,
                method: 'GET',
                params: { companyId, year, month },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({
                              type: 'schedules' as const,
                              id,
                          })),
                          { type: 'schedules', id: 'LIST' },
                      ]
                    : [{ type: 'schedules', id: 'LIST' }],
        }),

        updateEmployeeSchedule: builder.mutation<
            MessageResponse & { scheduleId: number },
            IUpdateEmployeeSchedule
        >({
            query: ({ companyId, employeeId, data }) => ({
                url: `/${employeeId}/update`,
                method: 'PATCH',
                data,
                params: { companyId },
            }),
            invalidatesTags: resp =>
                resp
                    ? [
                          { type: 'schedules', id: resp.scheduleId },
                          { type: 'schedules', id: 'LIST' },
                      ]
                    : [{ type: 'schedules', id: 'LIST' }],
        }),

        getEmployeeSchedule: builder.query<IMonthSchedule, IGetEmployeeSchedule>({
            query: ({ companyId, employeeId, year, month }) => ({
                url: `/${employeeId}/get-one`,
                method: 'GET',
                params: { companyId, year, month },
            }),
            providesTags: resp => [{ type: 'schedules', id: resp?.id }],
        }),

        deleteEmployeeSchedule: builder.mutation<{ message: string }, DeletingSchedule>({
            query: ({ companyId, employeeId, scheduleId }) => ({
                url: `/${scheduleId}/employee/${employeeId}/delete`,
                method: 'DELETE',
                params: { companyId },
            }),
            invalidatesTags: () => [{ type: 'schedules', id: 'LIST' }],
        }),

        getEmployeeAllSchedules: builder.query<
            IMonthSchedule[],
            Pick<IGetEmployeeSchedule, 'companyId' | 'employeeId'>
        >({
            query: ({ companyId, employeeId }) => ({
                url: `/${employeeId}/get-all`,
                method: 'GET',
                params: { companyId },
            }),
            providesTags: resp =>
                resp
                    ? [
                          ...resp.map(({ id }) => ({ type: 'schedules' as const, id })),
                          { type: 'schedules', id: 'LIST' },
                      ]
                    : [{ type: 'schedules', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllCompanySchedulesQuery,
    useLazyGetAllCompanySchedulesQuery,
    useUpdateEmployeeScheduleMutation,
    useGetEmployeeScheduleQuery,
    useLazyGetEmployeeScheduleQuery,
    useGetEmployeeAllSchedulesQuery,
    useLazyGetEmployeeAllSchedulesQuery,
    useDeleteEmployeeScheduleMutation,
} = schedulesApi;
