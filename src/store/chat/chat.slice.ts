import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel, Message } from '../../services/types/socket.types';

type IChatInitialState = {
    isInitialized: boolean;
    channels: Channel[];
    onlineUsers: number[];
    typingUsers: number[];
    selectedChannelId: null | number;
    isOpen: boolean;
};

const initialState: IChatInitialState = {
    isInitialized: false,
    channels: [],
    onlineUsers: [],
    typingUsers: [],
    selectedChannelId: null,
    isOpen: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        toggleChatOpen(state, { payload }: PayloadAction<boolean>) {
            state.isOpen = payload;
        },
        toggleTypingUser({ typingUsers }, { payload }: PayloadAction<number>) {
            if (typingUsers.includes(payload)) {
                typingUsers.splice(typingUsers.indexOf(payload), 1);
            } else {
                typingUsers.push(payload);
            }
        },
        joinOnlineUser(state, { payload }: PayloadAction<number>) {
            if (state.onlineUsers.includes(payload)) return;
            state.onlineUsers.push(payload);
        },
        removeOnlineUser(state, { payload }: PayloadAction<number>) {
            state.onlineUsers.splice(state.onlineUsers.indexOf(payload), 1);
        },
        addChannel(state, { payload }: PayloadAction<Channel>) {
            const channelIdx = state.channels.findIndex(({ id }) => id === payload.id);

            if (channelIdx === -1) {
                state.channels.push(payload);
            } else {
                state.channels[channelIdx] = payload;
            }
        },
        addMessage(state, { payload }: PayloadAction<Message>) {
            const channelIdx = state.channels.findIndex(({ id }) => id === payload.channel.id);
            if (channelIdx === -1) return;
            state.channels[channelIdx].messages = [payload, ...state.channels[channelIdx].messages];
        },
        addChannelMessages(state, { payload }: PayloadAction<{ id: number; messages: Message[] }>) {
            const channelIdx = state.channels.findIndex(({ id }) => id === payload.id);

            if (channelIdx === -1) return;

            state.channels[channelIdx].messages = state.channels[channelIdx].messages.concat(
                payload.messages
            );
        },
        setSelectedChannel(state, { payload }: PayloadAction<number | null>) {
            state.selectedChannelId = payload;
        },
        unreadInChannel(state, { payload }: PayloadAction<number>) {
            const channelIdx = state.channels.findIndex(({ id }) => id === payload);
            if (channelIdx === -1) return;
            state.channels[channelIdx].unreadCount++;
        },
        resetUnread(state, { payload }: PayloadAction<number>) {
            const channelIdx = state.channels.findIndex(({ id }) => id === payload);
            if (channelIdx === -1) return;
            state.channels[channelIdx].unreadCount = 0;
        },
    },
});

export default chatSlice;
