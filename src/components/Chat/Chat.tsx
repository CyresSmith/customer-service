import { useActions, useChat, useClickOutside, useEscapeKey } from 'hooks';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { ChatBox } from './Chat.styled';
import ChatList from './ChatList';
import MessagesList from './MessagesList';

type Props = {
    isChatOpen: boolean;
    closeChat: () => void;
};

const Chat = ({ isChatOpen, closeChat }: Props) => {
    useEscapeKey(closeChat);
    const chatRef = useClickOutside<HTMLDivElement>(closeChat);
    const { selectedChannelId } = useChat();
    const { setSelectedChannel } = useActions();
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const returnChatList = () => {
        setSelectedUser(null);
        setSelectedChannel(null);
    };

    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);
    const messagesOpen = Boolean(selectedCompany && (selectedChannelId || selectedUser));

    return (
        <ChatBox $isOpen={isChatOpen} ref={chatRef}>
            {(isMobile ? !messagesOpen : true) && (
                <ChatList
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            )}

            {messagesOpen && selectedCompany && (
                <MessagesList
                    selectedCompany={selectedCompany}
                    userId={selectedUser}
                    isChatOpen={isChatOpen}
                    returnChatList={returnChatList}
                />
            )}
        </ChatBox>
    );
};

export default Chat;
