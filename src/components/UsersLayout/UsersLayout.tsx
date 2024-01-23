import {MainSection, OutletWrapper} from './UsersLayout.styled';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Sidebar from '../Sidebar';

const UsersLayout = () => {
    return(
        // <Container>
            <MainSection>
                <Sidebar />
                <OutletWrapper>
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </OutletWrapper>
            </MainSection>
        // </Container>
    )
};

export default UsersLayout;