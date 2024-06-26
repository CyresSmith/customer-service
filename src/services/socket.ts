import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import companySlice from 'store/company/company.slice';
import { store } from 'store/store';
import socketSlice from '../store/chat/chat.slice';
import { Channel, ClientToServerEvents, Message, ServerToClientEvents } from './types/socket.types';

const {
    addChannel,
    joinOnlineUser,
    removeOnlineUser,
    addMessage,
    toggleTypingUser,
    unreadInChannel,
} = socketSlice.actions;

const { updateCompanyData } = companySlice.actions;

const API_HOST = import.meta.env.VITE_API_HOST;

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const createSocketConnection = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            socket = io(API_HOST, {
                path: '/socket-gate',
                withCredentials: true,
                extraHeaders: {
                    Authorization: `bearer ${token}`,
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

                resolve(socket);
            });

            socket.on('disconnect', async () => {
                console.log('socket disconnected');
            });

            socket.on('channel:created', channel => {
                store.dispatch(addChannel({ ...channel, unreadCount: 0 }));
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

            socket.on('user:startTyping', id => {
                if (id) store.dispatch(toggleTypingUser(id));
            });

            socket.on('user:stopTyping', id => {
                if (id) store.dispatch(toggleTypingUser(id));
            });

            socket.on('message:sent', (message: Message) => {
                store.dispatch(addMessage(message));

                const state = store.getState();
                const { isOpen, selectedChannelId } = state.chat;

                if (!isOpen || (isOpen && selectedChannelId !== message.channel.id)) {
                    store.dispatch(unreadInChannel(message.channel.id));
                    toast.info(`${message.content}`);
                }
            });

            socket.on('company:update', data => {
                store.dispatch(updateCompanyData(data));

                toast.info('Профіль компанії оновлено!');
            });

            socket.on('exception', async e => {
                console.error(e);
            });
        } catch (error) {
            reject(error);
        }
    });
};
