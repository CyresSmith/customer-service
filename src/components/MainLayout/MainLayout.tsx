import {Container, MainSection} from './MainLayout.styled';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import TopBar from '../TopBar';
import Sidebar from '../Sidebar';

const MainLayout = () => {
    return(
        <Container>
            <TopBar />
            <MainSection>
                <Sidebar />
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </MainSection>
        </Container>
    )
};

export default MainLayout;