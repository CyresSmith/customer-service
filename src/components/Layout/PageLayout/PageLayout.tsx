import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};

export default PageLayout;
