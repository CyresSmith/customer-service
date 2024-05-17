import { format } from 'date-fns';
import { useAuth } from 'hooks';
import { Message } from 'store/chat/socket.types';
import { MessageBox, MessageTime } from './MessageItem.styled';

type Props = {
    message: Message;
};

const MessageItem = ({ message }: Props) => {
    const { user } = useAuth();

    const timeForMessage = (str: string) => format(new Date(str), 'p');

    const isMy = user?.id === message.from.id;

    return (
        <MessageBox $isMy={isMy}>
            <p>{message.content}</p>

            <MessageTime>{timeForMessage(message.createdAt)}</MessageTime>
        </MessageBox>
    );
};

export default MessageItem;
