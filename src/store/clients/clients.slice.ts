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
        card: ''
    },
    allClients: [],
};

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        addNewClient(state, { payload }: PayloadAction<Client>) {
            return { choosen: { ...state.choosen, payload }, allClients: [payload, ...state.allClients] }
        },
    },
});

export default clientsSlice;