import { useAuth } from 'hooks/useAuth';

import AuthNav from './AuthNav';
import { Logo, TopBarWrapper } from './TopBar.styled';
import UsersNav from './UsersNav';

type Props = {
  openModal?: (arg: string) => void;
};

const TopBar = ({ openModal }: Props) => {
  const { isLoggedIn } = useAuth();

  return (
    <TopBarWrapper>
      <Logo to="/">LOGO</Logo>
      {isLoggedIn && <UsersNav />}
      {!isLoggedIn && <AuthNav openModal={openModal} />}
    </TopBarWrapper>
  );
};

export default TopBar;
