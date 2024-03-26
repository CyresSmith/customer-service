import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from "./instance";
import { MessageResponse } from "./types";
import { DeletingSchedule, IGetEmployeeSchedule, IMonthSchedule, IUpdateEmployeeSchedule } from "./types/schedule.types";

export const schedulesApi = createApi({
    reducerPath: 'schedulesApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['schedulesApi'],

    endpoints: builder => ({
        getAllCompanySchedules: builder.query<IMonthSchedule[], { companyId: number, year: number, month: number }> ({
            query: ({ companyId, year, month }) => ({
                url: `schedules/get-all`,
                method: 'GET',
                params: {companyId, year, month}
            })
        }),

        updateEmployeeSchedule: builder.mutation<MessageResponse, IUpdateEmployeeSchedule> ({
            query: ({ companyId, employeeId, data }) => ({
                url: `schedules/${employeeId}/update`,
                method: 'PATCH',
                data,
                params: {companyId}
            }),
            invalidatesTags: ['schedulesApi'],
        }),

        getEmployeeSchedule: builder.query<IMonthSchedule, IGetEmployeeSchedule>({
            query: ({ companyId, employeeId, year, month }) => ({
                url: `schedules/${employeeId}/get-one`,
                method: 'GET',
                params: {companyId, year, month}
            }),
        }),

        deleteEmployeeSchedule: builder.mutation<{message: string}, DeletingSchedule> ({
            query: ({ companyId, employeeId, scheduleId }) => ({
                url: `schedules/${scheduleId}/employee/${employeeId}/delete`,
                method: 'DELETE',
                params: {companyId}
            }),
            invalidatesTags: ['schedulesApi'],
        }),
    })
});

export const {
    useGetAllCompanySchedulesQuery,
    useUpdateEmployeeScheduleMutation,
    useGetEmployeeScheduleQuery,
    useDeleteEmployeeScheduleMutation
} = schedulesApi;