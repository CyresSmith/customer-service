import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './instance';
import { CreateEventType, EventType, GetMonthEvents } from './types/event.types';

export const eventsApi = createApi({
    reducerPath: 'eventsApi',

    baseQuery: axiosBaseQuery() as BaseQueryFn,

    tagTypes: ['events'],

    endpoints: builder => {
        return {
            createEvent: builder.mutation<EventType, CreateEventType>({
                query: ({ data, companyId }) => ({
                    url: 'events/create',
                    method: 'POST',
                    data,
                    params: { companyId },
                }),
                invalidatesTags: resp => [
                    { type: 'events', id: resp?.id },
                    { type: 'events', id: 'LIST' },
                ],
            }),

            getCompanyEvents: builder.query<EventType[], GetMonthEvents>({
                query: ({ companyId, year, month }) => ({
                    url: 'events/get-all',
                    method: 'GET',
                    params: { companyId, year, month },
                }),
                providesTags: resp =>
                    resp
                        ? [
                              ...resp.map(({ id }) => ({ type: 'events' as const, id })),
                              { type: 'events', id: 'LIST' },
                          ]
                        : [{ type: 'events', id: 'LIST' }],
            }),
        };
    },
});

export const { useCreateEventMutation, useGetCompanyEventsQuery, useLazyGetCompanyEventsQuery } =
    eventsApi;
