import { useChat, useClickOutside, useEscapeKey } from 'hooks';
import { useState } from 'react';
import { ChatBox } from './Chat.styled';
import ChatList from './ChatList';
import MessagesList from './MessagesList';

type Props = {
    isChatOpen: boolean;
    closeChat: () => void;
};

const Chat = ({ isChatOpen, closeChat }: Props) => {
    useEscapeKey(closeChat);
    const chatRef = useClickOutside(closeChat);
    const { selectedChannelId, channels } = useChat();

    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const messages = channels.find(({ id }) => id === selectedChannelId)?.messages || [];

    return (
        <ChatBox $isOpen={isChatOpen} ref={chatRef}>
            <ChatList
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />

            {selectedCompany && (selectedChannelId || selectedUser) && (
                <MessagesList
                    messages={messages}
                    selectedCompany={selectedCompany}
                    userId={selectedUser}
                    isChatOpen={isChatOpen}
                />
            )}
        </ChatBox>
    );
};

export default Chat;
