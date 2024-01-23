import AuthNav from 'components/TopBar/AuthNav';
import UsersNav from 'components/TopBar/UsersNav';
import { useAppSelector } from 'hooks';
import { Logo, TopBarWrapper } from './TopBar.styled';

type Props = {
  openModal?: (arg: string) => void;
};

const TopBar = ({ openModal }: Props) => {
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  const isLoading = useAppSelector(state => state.users.isLoading);

  return (
    <TopBarWrapper>
      <Logo to="/">LOGO</Logo>
      {isLoggedIn && !isLoading && <UsersNav />}
      {!isLoggedIn && !isLoading && <AuthNav openModal={openModal} />}
    </TopBarWrapper>
  );
};

export default TopBar;
