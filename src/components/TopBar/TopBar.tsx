import AuthNav from 'components/AuthNav';
import UsersNav from 'components/UsersNav';
import { useAuth } from 'hooks/useAuth';
import { Logo, TopBarWrapper } from './TopBar.styled';

type Props = {
  openModal?: (arg: string) => void;
};

const TopBar = ({ openModal }: Props) => {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <TopBarWrapper>
      <Logo to="/">LOGO</Logo>
      {isLoggedIn && !isLoading && <UsersNav />}
      {!isLoggedIn && !isLoading && <AuthNav openModal={openModal} />}
    </TopBarWrapper>
  );
};

export default TopBar;
