// import { lazy } from "react";
import MainLayout from 'components/Layout/MainLayout';
import PrivateRoute from 'helpers/PrivateRoute';
import { useActions } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCurrentQuery } from 'services/auth.api';

const HomePage = lazy(() => import('../src/pages/Home'));
const WorkPage = lazy(() => import('../src/pages/Workspace'));
const VerifyPage = lazy(() => import('../src/pages/Verify'));
const ErrorPage = lazy(() => import('../src/pages/ErrorPage'));

function App() {
  const { accessToken, user } = useAuth();
  const { setCurrentUser, logOut, setLoading } = useActions();

  const { data, isError, isLoading, isSuccess, error } = useCurrentQuery(
    accessToken,
    {
      skip: Boolean(user || !accessToken),
    }
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }

    if (isSuccess) {
      if (data && data?.user) {
        setCurrentUser(data);
      }
      setLoading(false);
    }

    if (isError) {
      console.log(error);

      logOut();
      setLoading(false);
    }
  }, [
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    logOut,
    setCurrentUser,
    setLoading,
  ]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        stacked
        transition={Bounce}
        theme={'colored'}
        newestOnTop
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<PublicRoute children={<HomePage />} />} /> */}
          <Route index element={<HomePage />} />
          <Route path="/verify/:code" element={<VerifyPage />} />
          <Route
            path="/company/:companyId"
            element={<PrivateRoute children={<WorkPage />} />}
          />
          {/* <Route path="tests" element={<PrivatRoute><TestSPage /></PrivatRoute>} />
              <Route path='mytests' element={<PrivatRoute><MyTestsPage /></PrivatRoute>}>
                <Route index element={<Navigate to='created' replace />} />
                <Route path=':userstests' element={<PrivatRoute><MyTests /></PrivatRoute>} />
              </Route>
              <Route path='test/:_id' element={<PrivatRoute><TestPage /></PrivatRoute>} />
              <Route path='details/:_id' element={<PrivatRoute><TestDetailsPage /></PrivatRoute>} /> */}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
