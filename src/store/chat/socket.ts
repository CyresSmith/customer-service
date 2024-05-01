import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import { store } from 'store/store';
import socketSlice from './chat.slice';
import { Channel, ClientToServerEvents, Message, ServerToClientEvents } from './socket.types';

const { addChannel, joinOnlineUser, removeOnlineUser, addMessage, setSelectedChannel } =
    socketSlice.actions;

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

    const errorHandler = (handler: any) => {
        const handleError = (err: unknown) => {
            console.error('please handle me', err);
        };

        return (...args: unknown[]) => {
            try {
                const ret = handler.apply(this, args);
                if (ret && typeof ret.catch === 'function') {
                    ret.catch(handleError);
                }
            } catch (e) {
                handleError(e);
            }
        };
    };

    socket.on('connect', async () => {
        console.log('socket connected');

        socket.emit('user:online');
        const { channels, onlineUsers } = await socket.emitWithAck('channel:list');

        if (channels.length > 0) {
            channels.forEach((channel: Channel) => store.dispatch(addChannel(channel)));
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
    });

    socket.on('user:hello', data => {
        if (data) {
            store.dispatch(joinOnlineUser(data.id));
            toast.success(`${data.name} на зв'язку`);
        }
    });

    socket.on('user:bye', data => {
        console.log('🚀 ~ createSocketConnection ~ data:', data);

        if (data) {
            store.dispatch(removeOnlineUser(data.id));
            toast.info(`${data.name} тепер офлайн`);
        }
    });

    socket.on('message:sent', (message: Message) => {
        store.dispatch(addMessage(message));
        store.dispatch(setSelectedChannel(message.channel.id));

        toast.info(`${message.content}`);
    });

    socket.on('exception', async e => {
        console.error(e);
    });
};
