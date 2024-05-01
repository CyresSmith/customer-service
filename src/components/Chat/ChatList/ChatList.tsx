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
    const { setSelectedChannel } = useActions();
    const [getEmployees] = useLazyGetCompanyEmployeesQuery();

    const [contacts, setContacts] = useState<BasicEmployeeInfo[]>([]);

    const handleCompanySelect = (companyId: number) => {
        selectCompany(companyId);
        setSelectedChannel(null);
    };

    const handleChannelSelect = (channelId?: number, userId?: number) => {
        if (channelId) {
            setSelectedChannel(channelId);
            setSelectedUser(null);
        }

        if (userId) {
            if (user?.id) {
                const channel = channels.find(
                    ({ users, type }) =>
                        users.includes(userId) && users.includes(user.id) && type === 'private'
                );

                if (channel) {
                    setSelectedUser(userId);
                    return setSelectedChannel(channel.id);
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
                    {contacts.map(({ id, firstName, lastName, avatar, userId }) => (
                        <li key={id}>
                            <button onClick={() => handleChannelSelect(undefined, userId)}>
                                <Badge show={onlineUsers.includes(userId)} style="success">
                                    <ItemAvatar
                                        avatar={avatar}
                                        name={`${firstName} ${lastName && lastName}`}
                                    />
                                </Badge>
                            </button>
                        </li>
                    ))}
                </List>
            )}
        </ListBox>
    );
};

export default ChatList;
