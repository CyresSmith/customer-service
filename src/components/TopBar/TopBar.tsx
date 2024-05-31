import LoginForm from 'components/TopBar/LoginForm';
import RegisterForm from 'components/TopBar/RegisterForm';
import Modal from 'components/Ui/Modal/Modal';
import { useAuth } from 'hooks/useAuth';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import AuthNav from './AuthNav';
import { Logo, TopBarWrapper } from './TopBar.styled';
import UsersNav from './UsersNav';

export type IsOpenType = 'register' | 'login' | null;

const TopBar = () => {
    const { isLoggedIn, accessToken } = useAuth();
    const { avatar, name, id } = useCompany();
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);
    const [isOpen, setIsOpen] = useState<IsOpenType>(null);
    const match = useMatch('/:companyId/*');

    const closeModal = () => setIsOpen(null);

    const isAuthenticate = isLoggedIn && Boolean(accessToken);

    return (
        <>
            <TopBarWrapper>
                {!match || isNaN(Number(match?.params?.companyId)) ? (
                    <Logo to="/">
                        <span>{isMobile ? 'Лого' : 'Тут буде лого'}</span>
                    </Logo>
                ) : (
                    <Logo to={`/${id}`}>
                        {avatar && <img src={avatar} alt={`company ${name} logo`} />}
                        {!isMobile && name && <span>{name}</span>}
                    </Logo>
                )}
                {isAuthenticate ? <UsersNav /> : <AuthNav setIsOpen={setIsOpen} />}
            </TopBarWrapper>

            {isOpen && (
                <Modal
                    $w="400px"
                    title={isOpen === 'register' ? 'Реєстрація' : 'Авторизація'}
                    children={
                        isOpen === 'register' ? (
                            <RegisterForm closeModal={closeModal} />
                        ) : (
                            <LoginForm closeModal={closeModal} />
                        )
                    }
                    $isOpen={isOpen !== null}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default TopBar;
