import {Container, OutletWrapper} from './MainLayout.styled';
import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';
import TopBar from '../TopBar';
import Modal from 'components/Modal/Modal';

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsOpen(o => !o);
    };

    return(
        <Container>
            <TopBar toggleModal={toggleModal} />
            <OutletWrapper>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </OutletWrapper>
            {isOpen && <Modal open={isOpen} toggleModal={toggleModal}/>}
        </Container>
    )
};

export default MainLayout;