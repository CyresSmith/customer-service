import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';
import { HiChevronDown } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { MenuSize } from '../Menu';
import {
  ChildrenBox,
  ItemBox,
  ItemChevron,
  ItemLink,
  Label,
  StyledIcon,
} from './Item.styled';

export interface MenuLink {
  id: string | number;
  label: string;
  to: string;
  Icon?: IconType;
}

export interface MenuItem extends MenuLink {
  children?: MenuItem[] | [];
  size?: MenuSize;
  openItem: string | null;
  setOpenItem: Dispatch<SetStateAction<string | null>>;
  onItemClick?: () => void;
  isChildren?: boolean;
}

const Item = ({
  label,
  to,
  children,
  size = 'm',
  Icon,
  onItemClick,
  openItem,
  setOpenItem,
  isChildren = false,
}: MenuItem) => {
  const handleItemClick = () => {
    if (onItemClick && !children?.length) onItemClick();

    if (!isChildren && !children?.length) setOpenItem(null);

    if (children && children.length > 0) {
      setOpenItem(p => (p === label ? null : label));
    }
  };

  const isOpen = openItem === label;

  return (
    <>
      <ItemBox $isOpen={isOpen} $menuSize={size}>
        <ItemLink
          to={to}
          as={children && children.length > 0 ? 'button' : NavLink}
          onClick={handleItemClick}
        >
          {Icon && <StyledIcon $menuSize={size} $isOpen={isOpen} as={Icon} />}

          <Label $isIcon={Boolean(Icon)}>{label}</Label>

          {children && children.length > 0 && (
            <ItemChevron $menuSize={size} as={HiChevronDown} $isOpen={isOpen} />
          )}
        </ItemLink>
      </ItemBox>

      {children && children.length > 0 && (
        <ChildrenBox $menuSize={size} $isOpen={isOpen}>
          <ul>
            {children.map(item => (
              <Item
                key={item.id}
                {...item}
                size={size}
                onItemClick={onItemClick}
                isChildren
              />
            ))}
          </ul>
        </ChildrenBox>
      )}
    </>
  );
};

export default Item;
