import MainLayout from 'components/Layout/MainLayout';
import Loader from 'components/Ui/Loader';
import PrivateRoute from 'helpers/PrivateRoute';
import { useActions } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCurrentQuery } from 'services/auth.api';

const HomePage = lazy(() => import('pages/Home'));
const ProfilePage = lazy(() => import('../src/pages/Profile'));
const CompanyProfile = lazy(() => import('pages/CompanyProfile'));
const ClientsListPage = lazy(() => import('./pages/ClientsListPage'));
const WorkSchedule = lazy(() => import('pages/WorkSchedule'));
const RecordLog = lazy(() => import('pages/RecordLog'));
const VerifyPage = lazy(() => import('pages/Verify'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));
const Workspace = lazy(() => import('components/Layout/UsersLayout'));
const EmployeesPage = lazy(() => import('pages/EmployeesPage'));

function App() {
  const { accessToken, user } = useAuth();
  const { setCurrentUser } = useActions();

  const { data, isSuccess } = useCurrentQuery(accessToken, {
    skip: Boolean(user || !accessToken),
  });

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
      <Suspense fallback={<Loader />}>
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
              path="/:companyId"
              element={<PrivateRoute children={<Workspace />} />}
            >
              <Route
                path="record-log"
                element={<PrivateRoute children={<RecordLog />} />}
              />

              <Route
                path="work-schedule"
                element={<PrivateRoute children={<WorkSchedule />} />}
              />
              <Route
                path="clients-list"
                element={<PrivateRoute children={<ClientsListPage />} />}
              />
              <Route
                path="clients-statistic"
                element={<PrivateRoute children={<ClientsListPage />} />}
              />
              <Route
                path="profile"
                element={<PrivateRoute children={<CompanyProfile />} />}
              />
              <Route
                path="employees"
                element={<PrivateRoute children={<EmployeesPage />} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
