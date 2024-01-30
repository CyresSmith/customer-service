import Item, { MenuItem } from './Item/Item';
import { MenuList } from './Menu.styled';

type Props = {
  items: MenuItem[];
  onItemClick?: () => void;
};

// ====================== пример объекта меню
// const menuItems: MenuItem[] = [
//   {
//     id: 1,
//     label: 'Компанії',
//     to: '/',
//     children: [
//       {
//         id: 5,
//         label: 'Профіль3',
//         to: '/',
//         children: [
//           {
//             id: 6,
//             label: 'Профіль3',
//             to: '/',
//           },
//           {
//             id: 7,
//             label: 'Профіль3',
//             to: '/',
//           },
//         ],
//       },
//       {
//         id: 8,
//         label: 'Профіль3',
//         to: '/',
//         children: [
//           {
//             id: 9,
//             label: 'Профіль3',
//             to: '/',
//           },
//           {
//             id: 10,
//             label: 'Профіль3',
//             to: '/',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 11
//     label: 'Профіль3',
//     to: '/',
//   },
// ];

const Menu = ({ items, onItemClick }: Props) => {
  return (
    <MenuList>
      {items.map(item => (
        <Item key={item.id} {...item} onItemClick={onItemClick} />
      ))}
    </MenuList>
  );
};

export default Menu;