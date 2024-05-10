export type ServerToClientEvents = {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    client: (data: string) => void;
    'channel:created': (channel: Channel) => void;
    'user:hello': (data: { id: number; name: string }) => void;
    'user:bye': (data: { id: number; name: string }) => void;
    'user:startTyping': (id: number) => void;
    'user:stopTyping': (id: number) => void;
    'message:sent': (message: Message) => void;
    exception: (e: unknown) => void;
};

export type ClientToServerEvents = {
    'user:online': () => void;
    'user:offline': () => void;
    'channel:list': () => { channels: Channel[]; onlineUsers: number[] };
    // 'message:send': (data: { content: string; channelId: number }) => void;
    'message:typing': (channelId: number) => void;
    'message:stopTyping': (channelId: number) => void;
    'message:send': (
        data: { content: string; channelId: number },
        callback: (message: Message) => void
    ) => void;
    'channel:create': (data: CreateChannelDto, callback: (channel: Channel) => void) => void;
};

export type InterServerEvents = {
    ping: () => void;
};

export type SocketData = {
    name: string;
    age: number;
};

export type ChannelType = 'public' | 'private';

export type Message = {
    id: number;
    channel: { id: number };
    from: { id: number };
    content: string;
    createdAt: string;
};

export type CreateMessageDto = Pick<Message, 'channel' | 'from' | 'content'>;

export type Channel = {
    id: number;
    name: string;
    type: ChannelType;
    avatar: string;
    users: number[];
    messages: Message[];
    unreadCount: 0;
};

export type CreateChannelDto = Pick<Channel, 'type' | 'users'> & {
    name?: string;
    company: number;
};
