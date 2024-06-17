import { useActions } from 'hooks';
import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';
import { HiChevronDown } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import {
    ChildrenBox,
    ItemBox,
    ItemChevron,
    ItemLink,
    Label,
    StyledIcon,
} from './SidebarItem.styled';

export type MenuLink = {
    id: string | number;
    label: string;
    to: string;
    Icon?: IconType;
};

export type MenuItem = MenuLink & {
    children?: MenuItem[];
    openItem?: string | null;
    setOpenItem?: Dispatch<SetStateAction<string | null>>;
    onItemClick?: () => void;
    isChildren?: boolean;
};

const SidebarItem = ({
    label,
    to,
    children,
    Icon,
    onItemClick,
    openItem,
    setOpenItem,
    isChildren = false,
}: MenuItem) => {
    const { closeMenu } = useActions();

    const handleItemClick = () => {
        if (onItemClick && !children?.length) onItemClick();

        if (!isChildren && !children?.length && setOpenItem) {
            setOpenItem(null);
        }

        if (children && children.length > 0 && setOpenItem) {
            setOpenItem(p => (p === label ? null : label));
        }

        !children && closeMenu();
    };

    const isOpen = openItem === label;

    return (
        <>
            <ItemBox $isOpen={isOpen}>
                <ItemLink
                    to={to}
                    as={children && children.length > 0 ? 'button' : NavLink}
                    onClick={handleItemClick}
                >
                    {Icon && <StyledIcon $isOpen={isOpen} as={Icon} />}

                    <Label $isIcon={Boolean(Icon)}>{label}</Label>

                    {children && children.length > 0 && (
                        <ItemChevron as={HiChevronDown} $isOpen={isOpen} />
                    )}
                </ItemLink>
            </ItemBox>

            {children && children.length > 0 && (
                <ChildrenBox $isOpen={isOpen}>
                    <ul>
                        {children.map((item, i) => (
                            <SidebarItem key={i} {...item} onItemClick={onItemClick} isChildren />
                        ))}
                    </ul>
                </ChildrenBox>
            )}
        </>
    );
};

export default SidebarItem;
