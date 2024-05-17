import Button from 'components/Ui/Buttons/Button';
import { FormInput } from 'components/Ui/Form/CustomForm.styled';
import TypingDots from 'components/Ui/TypingDots';
import { format, startOfDay } from 'date-fns';
import { useActions, useChat, useForm, useObserver } from 'hooks';
import { useScrollIntoView } from 'hooks/useScrollIntoView';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HiMiniPaperAirplane } from 'react-icons/hi2';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { socket } from 'store/chat/socket';
import MessageItem from './MessageItem';
import {
    DateBadge,
    MessageForm,
    MessagesBox,
    MessagesHeader,
    MessagesListBox,
    OnlineBadge,
} from './MessagesList.styled';

import { take } from 'store/chat/socket.types';

type Props = {
    selectedCompany: number;
    userId: number | null;
    isChatOpen: boolean;
};

const initialState = { message: '' };

const MessagesList = ({ selectedCompany, userId, isChatOpen }: Props) => {
    const { addChannel, addMessage, addChannelMessages, setSelectedChannel } = useActions();
    const { selectedChannelId, onlineUsers, typingUsers, channels } = useChat();
    const [lastMessageRef, isMessageIntersecting, messageObserver] = useObserver<HTMLLIElement>({});

    const channel = channels.find(({ id }) => id === selectedChannelId);
    const messages = channel?.messages || [];

    const messageDate = (dateStr: string) => new Date(dateStr);
    const DateForBadge = (dateStr: string) => format(messageDate(dateStr), 'PPP');
    const [isTyping, setIsTyping] = useState(false);

    const { scrollRef } = useScrollIntoView<HTMLLIElement>({
        behavior: 'smooth',
        dependence: messages.length,
    });

    const { data: users } = useGetCompanyEmployeesQuery(selectedCompany, {
        skip: !selectedCompany,
    });

    const listContainerRef: LegacyRef<HTMLUListElement> | null = useRef(null);

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

    const startTyping = useCallback(() => {
        if (isTyping) return;

        setIsTyping(true);
        if (isChatOpen && selectedChannelId) {
            socket.emit('message:typing', selectedChannelId);
        }
    }, [isTyping, isChatOpen, selectedChannelId]);

    const stopTyping = useCallback(() => {
        if (!isTyping) return;

        setIsTyping(false);
        if (isChatOpen && selectedChannelId) {
            socket.emit('message:stopTyping', selectedChannelId);
        }
    }, [isTyping, isChatOpen, selectedChannelId]);

    const throttledStartTyping = useMemo(() => throttle(startTyping, 250), [startTyping]);
    const debouncedStopTyping = useMemo(() => debounce(stopTyping, 300), [stopTyping]);

    useEffect(() => {
        return () => {
            throttledStartTyping.cancel();
            debouncedStopTyping.cancel();
        };
    }, [debouncedStopTyping, throttledStartTyping]);

    const handleKeyDown = useCallback(() => throttledStartTyping(), [throttledStartTyping]);
    const handleKeyUp = useCallback(() => debouncedStopTyping(), [debouncedStopTyping]);

    useEffect(() => {
        const loadMore = async () => {
            if (selectedChannelId) {
                const newMessages = await socket.emitWithAck('channel:messages', {
                    id: selectedChannelId,
                    fromDate: messages[messages.length - 1].createdAt,
                    take,
                });

                if (newMessages && newMessages.length > 0) {
                    addChannelMessages({ id: selectedChannelId, messages: newMessages });
                }
            }

            messageObserver?.disconnect();
        };

        if (isMessageIntersecting && messageObserver && selectedChannelId) loadMore();
    }, [isMessageIntersecting]);

    useEffect(() => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollTop = listContainerRef.current.scrollHeight;
        }
    }, [selectedChannelId]);

    return (
        <MessagesBox>
            <MessagesHeader>
                <span>
                    {selectedUser?.firstName} {selectedUser?.lastName || ''}
                </span>

                {userId && typingUsers.includes(userId) && <TypingDots />}

                {userId && onlineUsers.includes(userId) && <OnlineBadge />}
            </MessagesHeader>

            <MessagesListBox ref={listContainerRef}>
                {messages.length > 0 &&
                    messages.toReversed().map((message, i) => {
                        const prevDate = messageDate(messages.toReversed()[i - 1]?.createdAt);
                        const isNextDate =
                            startOfDay(prevDate) < startOfDay(messageDate(message.createdAt));
                        const isLast = i === 0;
                        const isNewDate = isLast || isNextDate;
                        const isFirst = i === messages.length - 1;

                        return (
                            <li
                                key={message.id}
                                ref={isFirst ? scrollRef : isLast ? lastMessageRef : undefined}
                            >
                                {isNewDate && (
                                    <DateBadge>{DateForBadge(message.createdAt)}</DateBadge>
                                )}

                                <MessageItem message={message} />
                            </li>
                        );
                    })}
            </MessagesListBox>

            <MessageForm onSubmit={handleSubmit}>
                <FormInput
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
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
