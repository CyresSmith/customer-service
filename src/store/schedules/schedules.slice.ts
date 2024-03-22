import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMonthSchedule, SchedulesState } from 'services/types/schedule.types';

const initialState: SchedulesState = {
    chosenSchedule: null,
    schedules: []
};

const schedulesSlice = createSlice({
  name: 'employees',
  initialState,
    reducers: {
        setAllSchedules(state, { payload }: PayloadAction<IMonthSchedule[]>) {
            return {
                ...state,
                schedules: payload
            }
        },

        updateSchedule(state, { payload }: PayloadAction<IMonthSchedule>) {
            return {
                chosenSchedule: payload,
                schedules: state.schedules.find(s => s.id === payload.id) ?
                    state.schedules.map(s => {
                    if (s.id === payload.id) {
                        return payload;
                    } 
                    return s;
                    }) :
                    [...state.schedules, payload]
                }
        },

        setChosenSchedule(state, { payload }: PayloadAction<IMonthSchedule>) {
            return {
                ...state,
                chosenSchedule: payload
            }
        },

        deleteSchedule(state, {payload}: PayloadAction<{id: number}>) {
            return {
                chosenSchedule: null,
                schedules: state.schedules.filter(s => s.id !== payload.id)
            }
        }
    },
});

export default schedulesSlice;
