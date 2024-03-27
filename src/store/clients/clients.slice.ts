import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client, ClientsState } from './clients.types';

const clientInitialState: Client = {
  id: 0,
  firstName: '',
  phone: '',
};

const initialState: ClientsState = {
  chosen: clientInitialState,
  allClients: [],
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addNewClient(state, { payload }: PayloadAction<Client>) {
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
          if (state.chosen && state.chosen.id === client.id) {
            return payload;
          }
          return client;
        }),
      };
    },
    setClientAvatar(state, { payload }: PayloadAction<Pick<Client, 'avatar'>>) {
      return state.chosen
        ? {
            chosen: {
              ...state.chosen,
              avatar: payload.avatar,
            },
            allClients: state.allClients.map(client => {
              if (state.chosen && client.id === state.chosen.id) {
                return { ...client, ...payload };
              }
              return client;
            }),
          }
        : state;
    },
    deleteClient(state, { payload }: PayloadAction<{ id: number }>) {
      return {
        ...state,
        allClients: state.allClients.filter(client => client.id !== payload.id),
      };
    },
  },
});

export default clientsSlice;
