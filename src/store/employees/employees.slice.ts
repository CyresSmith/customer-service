import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BasicEmployeeInfo,
  EmployeesState,
  IEmployee,
} from 'services/types/employee.types';

const initialState: EmployeesState = {
  chosenEmployee: null,
  allEmployees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addNewEmployee(state, { payload }: PayloadAction<BasicEmployeeInfo>) {
      return {
        ...state,
        allEmployees: [...state.allEmployees, payload],
      };
    },

    setChosenEmployee(state, { payload }: PayloadAction<IEmployee | null>) {
      return { ...state, chosenEmployee: payload };
    },

    setAllEmployees(state, { payload }: PayloadAction<BasicEmployeeInfo[]>) {
      return { ...state, allEmployees: payload };
    },

    updateEmployee(state, { payload }: PayloadAction<IEmployee>) {
      return {
        chosenEmployee: payload,
        allEmployees: state.allEmployees.map(e => {
          if (e.id === payload.id) {
            return {
              ...e,
              firstName: payload.firstName,
              lastName: payload.lastName,
              avatar: payload.avatar,
              jobTitle: payload.jobTitle,
              status: payload.status,
            };
          }
          return e;
        }),
      };
    },

    updateEmployeeAvatar(
      state,
      { payload }: PayloadAction<Pick<IEmployee, 'avatar'>>
    ) {
      if (state.chosenEmployee?.id) {
        return {
          chosenEmployee: {
            ...state.chosenEmployee,
            avatar: payload.avatar,
          },
          allEmployees: state.allEmployees.map(e => {
            if (e.id === state.chosenEmployee?.id) {
              return { ...e, ...payload };
            }
            return e;
          }),
        };
      }
    },
  },
});

export default employeesSlice;
