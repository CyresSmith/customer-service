import { useState } from 'react';
import Item, { MenuLink } from './Item/Item';
import { MenuList } from './Menu.styled';

export type MenuSize = 'm' | 'l';

type Props = {
  items: MenuLink[];
  size?: MenuSize;
  onItemClick?: () => void;
};

const Menu = ({ items, onItemClick, size = 'm' }: Props) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const props = {
    openItem,
    setOpenItem,
    onItemClick,
    size,
  };

  return (
    <MenuList $menuSize={size}>
      {items.map(item => (
        <Item key={item.id} {...item} {...props} />
      ))}
    </MenuList>
  );
};

export default Menu;
