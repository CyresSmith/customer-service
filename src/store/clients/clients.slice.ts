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
        discount: 0,
        source: '',
        comment: '',
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
        },
        updateClient(state, { payload }: PayloadAction<Client>) {
            return {
                choosen: payload,
                allClients: state.allClients.map(client => {
                    if (client.id === state.choosen.id) {
                        return payload;
                    }
                    return client;
                })
            };
        },
        setClientAvatar(state, { payload }: PayloadAction<Pick<Client, 'avatar'>>) {
            return {
                choosen: {
                    ...state.choosen,
                    avatar: payload.avatar,
                    },
                allClients: state.allClients.map(client => {
                    if (client.id === state.choosen.id) {
                        return { ...client, ...payload };
                    }
                    return client;
                })
            };
        },
    },
});

export default clientsSlice;