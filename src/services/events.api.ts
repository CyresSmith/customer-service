import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './instance';
import { CreateEventType, EventType, GetEvents } from './types/event.types';

export const eventsApi = createApi({
    reducerPath: 'eventsApi',

    baseQuery: axiosBaseQuery('events') as BaseQueryFn,

    tagTypes: ['events'],

    endpoints: builder => {
        return {
            createEvent: builder.mutation<EventType, CreateEventType>({
                query: ({ data, companyId }) => ({
                    url: '/create',
                    method: 'POST',
                    data,
                    params: { companyId },
                }),
                invalidatesTags: resp => [
                    { type: 'events', id: resp?.id },
                    { type: 'events', id: 'LIST' },
                ],
            }),

            getCompanyEvents: builder.query<EventType[], GetEvents>({
                query: params => ({
                    url: '',
                    method: 'GET',
                    params,
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
