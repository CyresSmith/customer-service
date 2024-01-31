import MainLayout from 'components/Layout/MainLayout';
import PrivateRoute from 'helpers/PrivateRoute';
import { useActions } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCurrentQuery } from 'services/auth.api';


const HomePage = lazy(() => import('pages/Home'));
const ProfilePage = lazy(() => import('../src/pages/Profile'));
const CompanyProfile = lazy(() => import('pages/CompanyProfile'));
const Clients = lazy(() => import('pages/Clients'));
const WorkSchedule = lazy(() => import('pages/WorkSchedule'));
const RecordLog = lazy(() => import('pages/RecordLog'));
const VerifyPage = lazy(() => import('pages/Verify'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));
const Workspace = lazy(() => import('components/Layout/UsersLayout'));

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
              element={<PrivateRoute children={<CompanyProfile />} />}
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
