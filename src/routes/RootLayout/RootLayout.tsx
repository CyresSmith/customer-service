import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default RootLayout;
