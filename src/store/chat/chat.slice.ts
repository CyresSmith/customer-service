import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel, Message } from './socket.types';

type IChatInitialState = {
    isInitialized: boolean;
    channels: Channel[];
    onlineUsers: number[];
    pendingUsers: number[];
    selectedChannelId: null | number;
};

const initialState: IChatInitialState = {
    isInitialized: false,
    channels: [],
    onlineUsers: [],
    pendingUsers: [],
    selectedChannelId: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        joinOnlineUser(state, { payload }: PayloadAction<number>) {
            state.onlineUsers.push(payload);
        },
        removeOnlineUser(state, { payload }: PayloadAction<number>) {
            state.onlineUsers.splice(state.onlineUsers.indexOf(payload), 1);
        },
        addChannel(state, { payload }: PayloadAction<Channel>) {
            state.channels.push(payload);
        },
        addMessage(state, { payload }: PayloadAction<Message>) {
            const channelIdx = state.channels.findIndex(({ id }) => id === payload.channel.id);

            if (channelIdx === -1) return;

            // if (message.userId !==  .id) {
            //     channel.unreadCount++;
            // }

            state.channels[channelIdx].messages.push(payload);
        },
        setSelectedChannel(state, { payload }: PayloadAction<number | null>) {
            state.selectedChannelId = payload;
        },
    },
});

export default chatSlice;
