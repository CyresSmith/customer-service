import MainLayout from 'components/Layout/MainLayout';
import PrivateRoute from 'helpers/PrivateRoute';
import { useActions } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import Clients from 'pages/Clients/Clients';
import CompanyProfilePage from 'pages/CompanyProfilePage/CompanyProfilePage';
import RecordLog from 'pages/RecordLog/RecordLog';
import WorkSchedule from 'pages/WorkSchedule/WorkSchedule';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCurrentQuery } from 'services/auth.api';

const HomePage = lazy(() => import('../src/pages/Home'));
const Workspace = lazy(() => import('../src/pages/Workspace'));
const VerifyPage = lazy(() => import('../src/pages/Verify'));
const ProfilePage = lazy(() => import('../src/pages/Profile'));
const ErrorPage = lazy(() => import('../src/pages/ErrorPage'));

function App() {
  const { accessToken, user } = useAuth();
  const { setCurrentUser } = useActions();

  const { data, isSuccess } = useCurrentQuery(
    accessToken,
    {
      skip: Boolean(user || !accessToken),
    }
  );

  useEffect(() => {
    if (isSuccess) {
      if (data && data?.user) {
        setCurrentUser(data);
      }
    }
  }, [data, isSuccess, setCurrentUser]);

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
            path="/my-profile"
            element={<PrivateRoute children={<ProfilePage />} />}
          />
          <Route
            path="/company/:companyId"
            element={<PrivateRoute children={<Workspace />}/>}>
            <Route
              path="record-log"
              element={<PrivateRoute children={<RecordLog />} />}
            />

            <Route
              path="work-schedule"
              element={<PrivateRoute children={<WorkSchedule />} />}
            />

            <Route
              path="clients"
              element={<PrivateRoute children={<Clients />} />}
            />

            <Route
              path="profile"
              element={<PrivateRoute children={<CompanyProfilePage />} />}
            />
          </Route>
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
