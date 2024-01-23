import { AiOutlineSchedule } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { VscBook } from 'react-icons/vsc';
import { List } from './NavList.styled';
import NavListItem from './NavListItem';

const items = [
  { name: 'Журнал записів', icon: VscBook },
  { name: 'Графік роботи', icon: AiOutlineSchedule },
  { name: 'Клієнти', icon: PiUsersThree },
];

const NavList = () => {
  return (
    <List>
      {items.map(({ name, icon }, i) => (
        <NavListItem key={i} name={name} Icon={icon} />
      ))}
    </List>
  );
};

export default NavList;
