import { useActions, useClickOutside, useEscapeKey } from 'hooks';
import { useMenu } from 'hooks/useMenu';
import { useState } from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';
import { HiAdjustments } from 'react-icons/hi';
import { PiUsersThree } from 'react-icons/pi';
import { VscBook } from 'react-icons/vsc';
import { MenuList } from './Sidebar.styled';
import SidebarItem from './SidebarItem';

const items = [
    { id: 1, to: 'record-log', label: 'Журнал записів', Icon: VscBook },
    {
        id: 2,
        to: 'work-schedule',
        label: 'Графік роботи',
        Icon: AiOutlineSchedule,
    },
    {
        id: 3,
        to: 'clients-list',
        label: 'Клієнти',
        Icon: PiUsersThree,
        // children: [
        //     { id: 1, to: 'clients-list', label: 'Список клієнтів' },
        //     { id: 2, to: 'clients-statistic', label: 'Статистика' },
        // ],
    },
    {
        id: 4,
        to: '',
        label: 'Налашутвання',
        Icon: HiAdjustments,
        children: [
            { id: 1, to: 'profile', label: 'Профіль' },
            { id: 2, to: 'employees', label: 'Співробітники' },
            { id: 2, to: 'services', label: 'Послуги' },
        ],
    },
];

const Sidebar = () => {
    const isOpen = useMenu();
    const { closeMenu } = useActions();
    useEscapeKey(() => closeMenu());

    const [openItem, setOpenItem] = useState<string | null>(null);
    const ref = useClickOutside<HTMLUListElement>(() => closeMenu());

    const props = {
        openItem,
        setOpenItem,
        onItemClick: () => {},
    };

    return (
        <MenuList $isOpen={isOpen} ref={ref}>
            {items.map(item => (
                <SidebarItem key={item.id} {...item} {...props} />
            ))}
        </MenuList>
    );
};

export default Sidebar;
