import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client, ClientsState } from './clients.types';

const initialState: ClientsState = {
  chosen: {
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
    gender: 'choose',
    card: '',
    companyId: undefined,
  },
  allClients: [],
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addNewClient(state, { payload }: PayloadAction<Client>) {
      console.log(payload);
      return { chosen: payload, allClients: [payload, ...state.allClients] };
    },
    setClients(state, { payload }: PayloadAction<Client[]>) {
      return { ...state, allClients: payload };
    },
    setChosenClient(state, { payload }: PayloadAction<Client>) {
      return { ...state, chosen: payload };
    },
    updateClient(state, { payload }: PayloadAction<Client>) {
      return {
        chosen: payload,
        allClients: state.allClients.map(client => {
          if (client.id === state.chosen.id) {
            return payload;
          }
          return client;
        }),
      };
    },
    setClientAvatar(state, { payload }: PayloadAction<Pick<Client, 'avatar'>>) {
      return {
        chosen: {
          ...state.chosen,
          avatar: payload.avatar,
        },
        allClients: state.allClients.map(client => {
          if (client.id === state.chosen.id) {
            return { ...client, ...payload };
          }
          return client;
        }),
      };
    },
    deleteClient(state, { payload }: PayloadAction<{ id: number }>) {
      return {
        chosen: initialState.chosen,
        allClients: state.allClients.filter(client => client.id !== payload.id),
      };
    },
  },
});

export default clientsSlice;
