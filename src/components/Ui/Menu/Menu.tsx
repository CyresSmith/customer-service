import Item, { MenuItem } from './Item/Item';
import { MenuList } from './Menu.styled';

type Props = {
  items: MenuItem[];
};

const Menu = ({ items }: Props) => {
  return (
    <MenuList>
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </MenuList>
  );
};

export default Menu;
