import Home from 'components/Home';
import RootLoader from 'components/Ui/RootLoader';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from 'routes/ErrorPage';
import RootLayout from 'routes/RootLayout';
import Task from 'routes/Task';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      loader: RootLoader,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'task/:taskId',
          element: <Task />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },
  ],
  {
    basename: '/customer-service',
  }
);
export default router;
