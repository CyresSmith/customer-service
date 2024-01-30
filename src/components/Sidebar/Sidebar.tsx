import Menu from 'components/Ui/Menu';
import { AiOutlineSchedule } from 'react-icons/ai';
import { HiAdjustments } from 'react-icons/hi';
import { PiUsersThree } from 'react-icons/pi';
import { VscBook } from 'react-icons/vsc';
import { Container } from './Sidebar.styled';

const items = [
  { id: 1, to: 'record-log', label: 'Журнал записів', Icon: VscBook },
  {
    id: 2,
    to: 'work-schedule',
    label: 'Графік роботи',
    Icon: AiOutlineSchedule,
  },
  { id: 3, to: 'clients', label: 'Клієнти', Icon: PiUsersThree },
  {
    id: 4,
    to: '',
    label: 'Налашутвання',
    Icon: HiAdjustments,
    children: [{ id: 1, to: 'profile', label: 'Профіль' }],
  },
];

const Sidebar = () => {
  return (
    <Container>
      <Menu items={items} size="l" />
    </Container>
  );
};

export default Sidebar;
