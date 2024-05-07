import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import { store } from 'store/store';
import socketSlice from './chat.slice';
import { Channel, ClientToServerEvents, Message, ServerToClientEvents } from './socket.types';

const {
    addChannel,
    joinOnlineUser,
    removeOnlineUser,
    addMessage,
    setSelectedChannel,
    unreadInChannel,
} = socketSlice.actions;

const API_HOST = import.meta.env.VITE_API_HOST;

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const createSocketConnection = (token: string, userId: number) => {
    socket = io(API_HOST, {
        path: '/socket-gate',
        withCredentials: true,
        extraHeaders: {
            authorization: `bearer ${token}`,
        },
    });

    socket.on('connect', async () => {
        console.log('socket connected');

        socket.emit('user:online');
        const { channels, onlineUsers } = await socket.emitWithAck('channel:list');

        if (channels.length > 0) {
            channels.forEach((channel: Channel) =>
                store.dispatch(addChannel({ ...channel, unreadCount: 0 }))
            );
        }

        if (onlineUsers.length > 0) {
            onlineUsers.forEach((userId: number) => store.dispatch(joinOnlineUser(userId)));
        }
    });

    socket.on('disconnect', async () => {
        console.log('socket disconnected');
    });

    socket.on('channel:created', channel => {
        store.dispatch(addChannel(channel));
        // store.dispatch(setSelectedChannel(channel.id));
    });

    socket.on('user:hello', data => {
        if (data) {
            store.dispatch(joinOnlineUser(data.id));
        }
    });

    socket.on('user:bye', data => {
        if (data) {
            store.dispatch(removeOnlineUser(data.id));
        }
    });

    socket.on('message:sent', (message: Message) => {
        store.dispatch(addMessage(message));
        store.dispatch(setSelectedChannel(message.channel.id));

        const state = store.getState();
        const { isOpen, selectedChannelId } = state.chat;

        if (!isOpen || (isOpen && selectedChannelId !== message.channel.id)) {
            store.dispatch(unreadInChannel(message.channel.id));
            toast.info(`${message.content}`);
        }
    });

    socket.on('exception', async e => {
        console.error(e);
    });
};
