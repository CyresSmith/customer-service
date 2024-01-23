import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import { MainSection, OutletWrapper } from './UsersLayout.styled';

const UsersLayout = () => {
  return (
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
  );
};

export default UsersLayout;
