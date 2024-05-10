import Button from 'components/Ui/Buttons/Button';
import { FormInput } from 'components/Ui/Form/CustomForm.styled';
import TypingDots from 'components/Ui/TypingDots';
import { format, startOfDay } from 'date-fns';
import { useActions, useChat, useForm } from 'hooks';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiMiniPaperAirplane } from 'react-icons/hi2';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { socket } from 'store/chat/socket';
import { Message } from 'store/chat/socket.types';
import MessageItem from './MessageItem';
import {
    DateBadge,
    MessageForm,
    MessagesBox,
    MessagesHeader,
    MessagesListBox,
    OnlineBadge,
} from './MessagesList.styled';

type Props = {
    selectedCompany: number;
    userId: number | null;
    messages: Message[];
    isChatOpen: boolean;
};

const initialState = { message: '' };

const MessagesList = ({ selectedCompany, userId, messages, isChatOpen }: Props) => {
    const { addChannel, addMessage, setSelectedChannel } = useActions();
    const { selectedChannelId, onlineUsers, typingUsers } = useChat();

    const [isTyping, setIsTyping] = useState(false);

    const { data: users } = useGetCompanyEmployeesQuery(selectedCompany, {
        skip: !selectedCompany,
    });

    const sendMessage = async (content: string, channelId: number) => {
        const newMessage = await socket.emitWithAck('message:send', {
            content,
            channelId,
        });

        if (newMessage) addMessage(newMessage);
    };

    const onSubmit = async () => {
        if (state.message.length > 0) {
            if (selectedChannelId) {
                sendMessage(state.message, selectedChannelId);
            } else if (userId) {
                const channel = await socket.emitWithAck('channel:create', {
                    company: selectedCompany,
                    type: 'private',
                    users: [userId],
                });

                addChannel({ ...channel, unreadCount: 0 });
                setSelectedChannel(channel.id);
                sendMessage(state.message, channel.id);
            }
        }

        reset();
    };

    const { handleChange, handleSubmit, reset, state } = useForm(initialState, onSubmit);

    const selectedUser = users?.find(({ userId: id }) => id === userId);

    const messageDate = (dateStr: string) => new Date(dateStr);
    const DateForBadge = (dateStr: string) => format(messageDate(dateStr), 'PPP');

    const startTyping = useCallback(() => {
        if (isTyping) return;

        setIsTyping(true);
        isChatOpen && selectedChannelId && socket.emit('message:typing', selectedChannelId);
    }, [isChatOpen, isTyping, selectedChannelId]);

    const stopTyping = useCallback(() => {
        setIsTyping(false);
        isChatOpen && selectedChannelId && socket.emit('message:stopTyping', selectedChannelId);
    }, [isChatOpen, selectedChannelId]);

    const throttledStartTyping = useMemo(() => throttle(startTyping, 250), [startTyping]);

    const debouncedStopTyping = useMemo(() => debounce(stopTyping, 300), [stopTyping]);

    useEffect(() => {
        return () => {
            throttledStartTyping.cancel();
            debouncedStopTyping.cancel();
        };
    }, [debouncedStopTyping, throttledStartTyping]);

    return (
        <MessagesBox>
            <MessagesHeader>
                <span>
                    {selectedUser?.firstName} {selectedUser?.lastName}
                </span>

                {userId && typingUsers.includes(userId) && <TypingDots />}

                {userId && onlineUsers.includes(userId) && <OnlineBadge />}
            </MessagesHeader>

            <MessagesListBox>
                {messages.length > 0 &&
                    messages.map((message, i) => {
                        const prevDate = messageDate(messages[i - 1]?.createdAt);

                        const isNextDate =
                            startOfDay(prevDate) < startOfDay(messageDate(message.createdAt));

                        return (
                            <li key={message.id}>
                                {(i === 0 || isNextDate) && (
                                    <DateBadge>{DateForBadge(message.createdAt)}</DateBadge>
                                )}

                                <MessageItem
                                    message={message}
                                    messagePosition={i + 1}
                                    messagesCount={messages.length}
                                />
                            </li>
                        );
                    })}
            </MessagesListBox>

            <MessageForm onSubmit={handleSubmit}>
                <FormInput
                    onKeyDown={throttledStartTyping}
                    onKeyUp={debouncedStopTyping}
                    type="text"
                    name="message"
                    value={state.message}
                    onChange={handleChange}
                    placeholder="Введіть повідомлення"
                />

                <Button
                    disabled={state.message.length === 0}
                    type="submit"
                    Icon={HiMiniPaperAirplane}
                    $colors="accent"
                />
            </MessageForm>
        </MessagesBox>
    );
};

export default MessagesList;
