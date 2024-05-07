import Chat from 'components/Chat';
import Badge from 'components/Ui/Badge';
import Button from 'components/Ui/Buttons/Button/Button';
import Dropdown from 'components/Ui/Dropdown';
import Menu from 'components/Ui/Menu';
import { MenuLink } from 'components/Ui/Menu/Item/Item';
import Modal from 'components/Ui/Modal/Modal';
import { useActions, useChat } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { HiLogout, HiMenu } from 'react-icons/hi';
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { IoMdAddCircle } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogOutMutation } from 'services/auth.api';
import { socket } from 'store/chat/socket';
import CreateCompanyForm from './CreateCompanyForm';
import {
    NavWrapper,
    UsersAvatar,
    UsersAvatarWrapper,
    UsersEmail,
    UsersNoAvatar,
    UsersOptions,
} from './UsersNav.styled';

const menuItems: MenuLink[] = [
    {
        id: 'home',
        label: 'Головна',
        to: '/',
    },
    {
        id: 'my-profile',
        label: 'Профіль',
        to: '/my-profile',
    },
];

const UsersNav = () => {
    const { user, companies } = useAuth();
    const { logOut, resetCompanyState, removeOnlineUser, toggleChatOpen } = useActions();
    const { channels } = useChat();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [dropOpen, setDropOpen] = useState<boolean>(false);
    const [chatOpen, setChatOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [apiLogout, { isLoading, isSuccess }] = useLogOutMutation();

    const totalUnreadCount = channels.reduce((count: number, { unreadCount }) => {
        return unreadCount > 0 ? (count += unreadCount) : count;
    }, 0);

    const setMenuItems = () => {
        return companies?.length > 0
            ? [
                  ...menuItems,
                  {
                      id: 'companies',
                      label: 'Компанії',
                      to: '',
                      children: companies.map(({ id, name }) => ({
                          id,
                          label: name,
                          to: `/${id}`,
                      })),
                  },
              ]
            : menuItems;
    };

    const handleLogout = (): void => {
        if (user) {
            removeOnlineUser(user.id);
        }

        socket.emit('user:offline');

        apiLogout({});
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
            logOut();
            resetCompanyState();
            setDropOpen(false);
            toast.info(`До зустрічі, ${user?.firstName}!`);
        }
    }, [isSuccess, logOut, navigate, resetCompanyState, user?.firstName]);

    useEffect(() => {
        toggleChatOpen(chatOpen);
    }, [chatOpen]);

    return (
        <NavWrapper>
            <UsersOptions>
                {pathname === '/' && (
                    <Button
                        onClick={() => setModalOpen(true)}
                        Icon={IoMdAddCircle}
                        $colors="light"
                        children="Нова компанія"
                    />
                )}

                <UsersAvatarWrapper>
                    {user?.avatar ? (
                        <UsersAvatar src={user?.avatar} />
                    ) : (
                        <UsersNoAvatar>{user?.firstName?.split('')[0]}</UsersNoAvatar>
                    )}
                </UsersAvatarWrapper>

                <UsersEmail>{user?.firstName ? user?.firstName : user?.email}</UsersEmail>

                <Badge show={totalUnreadCount > 0} count={totalUnreadCount}>
                    <Button
                        onClick={() => setChatOpen(p => !p)}
                        Icon={HiChatBubbleLeftEllipsis}
                        $variant="text"
                        $colors="accent"
                        $round
                        size="l"
                    />
                </Badge>

                <Button
                    onClick={() => setDropOpen(p => !p)}
                    Icon={HiMenu}
                    $variant="text"
                    $colors="accent"
                    $round
                />

                <Chat isChatOpen={chatOpen} closeChat={() => setChatOpen(false)} />

                {dropOpen && (
                    <Dropdown $isOpen={dropOpen} closeDropdown={() => setDropOpen(false)}>
                        <>
                            <Menu items={setMenuItems()} onItemClick={() => setDropOpen(false)} />

                            <Button
                                isLoading={isLoading}
                                disabled={isLoading}
                                onClick={handleLogout}
                                Icon={HiLogout}
                                $colors="light"
                                size="s"
                            >
                                Вихід
                            </Button>
                        </>
                    </Dropdown>
                )}
            </UsersOptions>

            {modalOpen && (
                <Modal $isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
                    <CreateCompanyForm closeModal={() => setModalOpen(false)} />
                </Modal>
            )}
        </NavWrapper>
    );
};

export default UsersNav;
