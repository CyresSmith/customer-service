import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeesState, IEmployee } from "services/types/employee.types";

const initialState: EmployeesState = {
    chosenEmployee: null,
    allEmployees: []
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addNewEmployee(state, { payload }: PayloadAction<IEmployee>) {
            return {
                ...state,
                allEmployees: [
                    ...state.allEmployees,
                    {
                        id: payload.id,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        avatar: payload.avatar,
                        jobTitle: payload.jobTitle,
                        status: payload.status
                    }
                ]
            }
        },

        setChosenEmployee(state, { payload }: PayloadAction<IEmployee | null>) {
            return {...state, chosenEmployee: payload}
        },

        setAllEmployees(state, { payload }: PayloadAction<Partial<IEmployee>[]>) {
            return {...state, allEmployees: payload};
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
                            status: payload.status
                        };
                    }
                    return e;
                })
            }
        },

        updateEmployeeAvatar(state, { payload }: PayloadAction<Pick<IEmployee, 'avatar'>>) {
            if (state.chosenEmployee?.id) {
                return {
                    chosenEmployee: {
                        ...state.chosenEmployee,
                        avatar: payload.avatar,
                    },
                    allEmployees: state.allEmployees.map(e => {
                        if (e.id === state.chosenEmployee?.id) {
                            return {...e, ...payload}
                        }
                        return e;
                    })
                };
            }
        }
        // addNewClient(state, { payload }: PayloadAction<Client>) {
        //     console.log(payload)
        //     return { choosen: payload, allClients: [payload, ...state.allClients] }
        // },
        // setClients(state, { payload }: PayloadAction<Client[]>) {
        //     return {...state, allClients: payload}
        // },
        // setChoosenClient(state, { payload }: PayloadAction<Client>) {
        //     return {...state, choosen: payload}
        // },
        // updateClient(state, { payload }: PayloadAction<Client>) {
        //     return {
        //         choosen: payload,
        //         allClients: state.allClients.map(client => {
        //             if (client.id === state.choosen.id) {
        //                 return payload;
        //             }
        //             return client;
        //         })
        //     };
        // },
        // setClientAvatar(state, { payload }: PayloadAction<Pick<Client, 'avatar'>>) {
        //     return {
        //         choosen: {
        //             ...state.choosen,
        //             avatar: payload.avatar,
        //             },
        //         allClients: state.allClients.map(client => {
        //             if (client.id === state.choosen.id) {
        //                 return { ...client, ...payload };
        //             }
        //             return client;
        //         })
        //     };
        // },
        // deleteClient(state, { payload }: PayloadAction<{id: number}>) {
        //     return {
        //         choosen: initialState.choosen,
        //         allClients: state.allClients.filter(client => client.id !== payload.id)
        //     };
        // },
    },
});

export default employeesSlice;