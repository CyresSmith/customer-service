import ItemsList from 'components/Ui/ItemsList';
import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { useActions, useAuth, useChat } from 'hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { CompanyItem, List, ListBox } from './ChatList.styled';

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
                    resetUnread(channel.id);
                    setSelectedChannel(channel.id);
                    return;
                }
            }

            setSelectedUser(userId);
            setSelectedChannel(null);
        }
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

    useEffect(() => {
        if (!companies || companies.length > 0) return;

        setSelectedCompany(companies[0]?.id);
    }, [companies, setSelectedCompany]);

    return (
        <ListBox>
            <List>
                {companies.map(({ id, name, avatar }) => (
                    <li key={id}>
                        <CompanyItem
                            onClick={() => handleCompanySelect(id)}
                            $isSelected={selectedCompany === id}
                        >
                            <ItemAvatar name={name} avatar={avatar} />

                            <p>{name}</p>
                        </CompanyItem>

                        {!isLoading && selectedCompany === id && user && (
                            <ItemsList
                                items={contacts.map(({ avatar, firstName, lastName, userId }) => {
                                    const channel = usersPrivateChannel(userId, user.id);

                                    return {
                                        id: userId,
                                        avatar,
                                        name: `${firstName} ${lastName}`,
                                        isOnline:
                                            channel && channel.unreadCount > 0
                                                ? channel.unreadCount
                                                : onlineUsers.includes(userId),
                                    };
                                })}
                                onItemClick={id => handleChannelSelect(undefined, id)}
                                nameColumnTitle="Ім'я"
                                activeItem={selectedUser || undefined}
                                listSortPanel={false}
                                listHeader={contacts && contacts.length > 0}
                            />
                        )}
                    </li>
                ))}
            </List>
        </ListBox>
    );
};

export default ChatList;
