import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client, ClientsState } from "./clients.types";

const initialState: ClientsState = {
    choosen: {
        firstName: '',
        lastName: '',
        phone: '',
        id: '',
        email: '',
        avatar: '',
        discount: undefined,
        source: '',
        comments: '',
        birthday: '',
        gender: undefined,
        card: '',
        companyId: undefined
    },
    allClients: [],
};

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        addNewClient(state, { payload }: PayloadAction<Client>) {
            console.log(payload)
            return { choosen: payload, allClients: [payload, ...state.allClients] }
        },
        setClients(state, { payload }: PayloadAction<Client[]>) {
            return {...state, allClients: payload}
        },
        setChoosenClient(state, { payload }: PayloadAction<Client>) {
            return {...state, choosen: payload}
        }
    },
});

export default clientsSlice;