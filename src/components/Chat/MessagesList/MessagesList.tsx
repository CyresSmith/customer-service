import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { format, startOfDay } from 'date-fns';
import { useActions, useChat, useForm } from 'hooks';
import { useEffect, useState } from 'react';
import { HiMiniPaperAirplane } from 'react-icons/hi2';
import { socket } from 'store/chat/socket';
import { Message } from 'store/chat/socket.types';
import MessageItem from './MessageItem';
import { DateBadge, MessageForm, MessagesBox, MessagesListBox } from './MessagesList.styled';

type Props = {
    companyId: number;
    userId: number | null;
};

const initialState = { message: '' };

const MessagesList = ({ companyId, userId }: Props) => {
    const { addChannel, addMessage, setSelectedChannel } = useActions();
    const { selectedChannelId, channels } = useChat();

    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (content: string, channelId: number) => {
        const newMessage = await socket.emitWithAck('message:send', {
            content,
            channelId,
        });

        addMessage(newMessage);
    };

    const onSubmit = async ({ message }: typeof initialState) => {
        if (message === '') return;

        if (selectedChannelId) {
            sendMessage(message, selectedChannelId);
        } else if (userId) {
            const channel = await socket.emitWithAck('channel:create', {
                company: companyId,
                type: 'private',
                users: [userId],
            });

            addChannel(channel);
            setSelectedChannel(channel.id);
            sendMessage(message, channel.id);
        }

        reset();
    };

    const { state, handleChange, handleSubmit, reset } = useForm<{
        message: string;
    }>(initialState, onSubmit);

    const messageDate = (dateStr: string) => new Date(dateStr);
    const DateForBadge = (dateStr: string) => format(messageDate(dateStr), 'PPP');

    useEffect(() => {
        if (!channels) return;

        const channel = channels.find(({ id }) => id === selectedChannelId);
        setMessages(channel?.messages || []);
    }, [selectedChannelId, channels]);

    return (
        <MessagesBox>
            <MessagesListBox>
                {messages.map((message, i) => {
                    const prevDate = messageDate(messages[i - 1]?.createdAt);

                    const isNextDate =
                        startOfDay(prevDate) < startOfDay(messageDate(message.createdAt));

                    return (
                        <>
                            {(i === 0 || isNextDate) && (
                                <DateBadge>{DateForBadge(message.createdAt)}</DateBadge>
                            )}

                            <MessageItem
                                key={message.id}
                                message={message}
                                messagePosition={i + 1}
                                messagesCount={messages.length}
                            />
                        </>
                    );
                })}
            </MessagesListBox>

            <MessageForm onSubmit={handleSubmit}>
                <CustomFormInput
                    name="message"
                    type="text"
                    value={state.message}
                    placeholder="Введіть повідомлення"
                    handleChange={handleChange}
                    disabledIcon
                    label={false}
                />

                <Button
                    disabled={state.message === ''}
                    type="submit"
                    Icon={HiMiniPaperAirplane}
                    $colors="accent"
                />
            </MessageForm>
        </MessagesBox>
    );
};

export default MessagesList;
