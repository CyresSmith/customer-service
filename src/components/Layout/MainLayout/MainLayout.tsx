import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../TopBar';
import { Container, OutletWrapper } from './MainLayout.styled';

const MainLayout = () => {
  return (
    <Container>
      <TopBar />
      <OutletWrapper>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </OutletWrapper>
    </Container>
  );
};

export default MainLayout;
