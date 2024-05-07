import Badge from 'components/Ui/Badge';
import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { useActions, useAuth, useChat } from 'hooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLazyGetCompanyEmployeesQuery } from 'services/employee.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { List, ListBox } from './ChatList.styled';

type Props = {
    selectedCompany: number | null;
    selectCompany: Dispatch<SetStateAction<number | null>>;
    selectedUser: number | null;
    setSelectedUser: Dispatch<SetStateAction<number | null>>;
};

const ChatList = ({ selectedCompany, selectCompany, selectedUser, setSelectedUser }: Props) => {
    const { companies, user } = useAuth();
    const { channels, onlineUsers } = useChat();
    const { setSelectedChannel, resetUnread } = useActions();
    const [getEmployees] = useLazyGetCompanyEmployeesQuery();

    const [contacts, setContacts] = useState<BasicEmployeeInfo[]>([]);

    const handleCompanySelect = (companyId: number) => {
        selectCompany(companyId);
        setSelectedChannel(null);
    };

    const usersPrivateChannel = (user1: number, user2: number) =>
        channels.find(
            ({ users, type }) =>
                users.includes(user1) && users.includes(user2) && type === 'private'
        );

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

    useEffect(() => {
        if (!selectedCompany) return;

        const setCompanyContacts = async () => {
            const employees = (await getEmployees(selectedCompany))?.data;

            if (employees && employees.length > 0)
                setContacts(employees.filter(({ userId }) => userId !== user?.id));
        };

        setCompanyContacts();
    }, [getEmployees, selectedCompany]);

    return (
        <ListBox>
            <List>
                {companies.map(({ id, name }) => (
                    <li key={id}>
                        <button onClick={() => handleCompanySelect(id)}>
                            <ItemAvatar name={name} />
                        </button>
                    </li>
                ))}
            </List>

            {selectedCompany && contacts.length > 0 && (
                <List>
                    {contacts.map(({ id, firstName, lastName, avatar, userId }) => {
                        const channel = user ? usersPrivateChannel(userId, user.id) : undefined;

                        return (
                            <li key={id}>
                                <button onClick={() => handleChannelSelect(undefined, userId)}>
                                    <Badge
                                        show={onlineUsers.includes(userId)}
                                        count={channel?.unreadCount || undefined}
                                        style="success"
                                    >
                                        <ItemAvatar
                                            avatar={avatar}
                                            name={`${firstName} ${lastName && lastName}`}
                                        />
                                    </Badge>
                                </button>
                            </li>
                        );
                    })}
                </List>
            )}
        </ListBox>
    );
};

export default ChatList;
