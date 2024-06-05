import { useActions, useAdminRights, useClickOutside, useEscapeKey } from 'hooks';
import { useMenu } from 'hooks/useMenu';
import { useUserRole } from 'hooks/useUserRole';
import { useState } from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';
import { HiAdjustments } from 'react-icons/hi';
import { LiaCashRegisterSolid } from 'react-icons/lia';
import { PiUsersThree } from 'react-icons/pi';
import { VscBook } from 'react-icons/vsc';
import { EmployeeRoleEnum } from 'services/types/employee.types';
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
    },
    {
        id: 5,
        to: 'finance',
        label: 'Фінанси',
        Icon: LiaCashRegisterSolid,
        children: [
            { id: 1, to: 'cashflow', label: 'Доходи і витрати' },
            { id: 2, to: 'cashboxes', label: 'Каси та рахунки' },
        ],
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
    const isAdmin = useAdminRights();
    const userRole = useUserRole();
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
            {(isAdmin ? items : items.filter(({ to }) => to !== 'finance')).map(item => {
                const itemProps = { ...item };

                if (
                    userRole === EmployeeRoleEnum.ADMIN &&
                    itemProps.children &&
                    itemProps.children.length > 0
                ) {
                    itemProps.children = itemProps.children.filter(({ to }) => to !== 'cashboxes');
                }

                return <SidebarItem key={item.id} {...itemProps} {...props} />;
            })}
        </MenuList>
    );
};

export default Sidebar;
