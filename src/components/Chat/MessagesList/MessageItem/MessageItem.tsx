import { format } from 'date-fns';
import { useAuth } from 'hooks';
import { useScrollIntoView } from 'hooks/useScrollIntoView';
import { Message } from 'store/chat/socket.types';
import { MessageBox, MessageTime } from './MessageItem.styled';

type Props = { message: Message; messagesCount: number; messagePosition: number };

const MessageItem = ({ messagesCount, messagePosition, message }: Props) => {
    const { scrollRef } = useScrollIntoView<HTMLLIElement>(messagesCount);
    const { user } = useAuth();

    const isLastMessage = messagePosition === messagesCount;

    const timeForMessage = (str: string) => format(new Date(str), 'p');

    const isMy = user?.id === message.from.id;

    return (
        <MessageBox $isMy={isMy} ref={isLastMessage ? scrollRef : undefined}>
            <p>{message.content}</p>

            <MessageTime>{timeForMessage(message.createdAt)}</MessageTime>
        </MessageBox>
    );
};

export default MessageItem;
