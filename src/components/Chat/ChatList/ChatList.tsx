import Badge from 'components/Ui/Badge';
import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { useActions, useAuth, useChat } from 'hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import {
    CompanyItem,
    ContactItem,
    ContactName,
    ContactsList,
    List,
    ListBox,
    ListItem,
} from './ChatList.styled';

type Props = {
    selectedCompany: number | null;
    setSelectedCompany: Dispatch<SetStateAction<number | null>>;
    selectedUser: number | null;
    setSelectedUser: Dispatch<SetStateAction<number | null>>;
};

const ChatList = ({
    selectedCompany,
    setSelectedCompany,
    selectedUser,
    setSelectedUser,
}: Props) => {
    const { companies, user } = useAuth();
    const { channels, onlineUsers } = useChat();
    const { setSelectedChannel, resetUnread } = useActions();

    const { data, isLoading } = useGetCompanyEmployeesQuery(selectedCompany, {
        skip: !selectedCompany,
    });

    const handleCompanySelect = (companyId: number) => {
        setSelectedCompany(p => (p === companyId ? null : companyId));
        setSelectedChannel(null);
        setSelectedUser(null);
    };

    const usersPrivateChannel = (user1: number, user2: number) => {
        return channels.find(
            ({ users, type }) =>
                users.includes(user1) && users.includes(user2) && type === 'private'
        );
    };

    const contacts =
        data
            ?.filter(({ userId }) => userId !== user?.id)
            ?.sort((a, b) => {
                if (a.isOnline === b.isOnline) return 0;
                if (a.isOnline && !b.isOnline) return -1;
                if (!a.isOnline && b.isOnline) return 1;
                return 0;
            }) || [];

    const handleChannelSelect = (channelId?: number, userId?: number) => {
        if (channelId) {
            setSelectedChannel(channelId);
            setSelectedUser(null);
            resetUnread(channelId);
        } else if (userId) {
            if (user?.id) {
                const channel = usersPrivateChannel(userId, user.id);

                if (channel) {
                    setSelectedUser(userId);
                    setSelectedChannel(channel.id);
                    resetUnread(channel.id);
                    return;
                }
            }

            setSelectedUser(userId);
            setSelectedChannel(null);
        }
    };

    useEffect(() => {
        if (!companies || companies.length > 0) return;

        setSelectedCompany(companies[0]?.id);
    }, [companies, setSelectedCompany]);

    return (
        <ListBox>
            <List>
                {companies.map(({ id, name, avatar }) => {
                    const isSelected = selectedCompany === id && contacts.length > 0;

                    return (
                        <ListItem key={id} $isSelected={isSelected}>
                            <CompanyItem
                                onClick={() => handleCompanySelect(id)}
                                $isSelected={isSelected}
                            >
                                <ItemAvatar name={name} avatar={avatar} />

                                <p>{name}</p>
                            </CompanyItem>

                            <ContactsList
                                $isSelected={isSelected}
                                $contactsCount={isSelected ? contacts.length : 0}
                            >
                                {isSelected &&
                                    contacts.map(({ avatar, firstName, lastName, userId }) => {
                                        const channel =
                                            user && usersPrivateChannel(userId, user.id);

                                        return (
                                            <li key={userId}>
                                                <ContactItem
                                                    $active={selectedUser === userId}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        handleChannelSelect(undefined, userId);
                                                    }}
                                                >
                                                    <Badge
                                                        show={onlineUsers.includes(userId)}
                                                        count={channel?.unreadCount || undefined}
                                                        style="success"
                                                    >
                                                        <ItemAvatar
                                                            avatar={avatar}
                                                            name={firstName + ' ' + lastName}
                                                        />
                                                    </Badge>

                                                    <ContactName>
                                                        {firstName + ' ' + lastName}
                                                    </ContactName>
                                                </ContactItem>
                                            </li>
                                        );
                                    })}
                            </ContactsList>
                        </ListItem>
                    );
                })}
            </List>
        </ListBox>
    );
};

export default ChatList;
