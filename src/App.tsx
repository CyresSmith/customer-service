import MainLayout from 'components/Layout/MainLayout';
import Loader from 'components/Ui/Loader';
import { setDefaultOptions } from 'date-fns';
import { uk } from 'date-fns/locale';
import PrivateRoute from 'helpers/PrivateRoute';
import { useActions, useAuth, useLoading } from 'hooks';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useLazyCurrentQuery } from 'services/auth.api';

setDefaultOptions({ locale: uk });

const HomePage = lazy(() => import('pages/Home'));
const ServicesPage = lazy(() => import('pages/ServicesPage'));
const ProfilePage = lazy(() => import('../src/pages/Profile'));
const CompanyProfile = lazy(() => import('pages/CompanyProfile'));
const ClientsListPage = lazy(() => import('./pages/ClientsListPage'));
const WorkSchedule = lazy(() => import('pages/WorkSchedule'));
const RecordLog = lazy(() => import('pages/RecordLogPage'));
const VerifyPage = lazy(() => import('pages/Verify'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));
const Workspace = lazy(() => import('components/Layout/UsersLayout'));
const EmployeesPage = lazy(() => import('pages/EmployeesPage'));

function App() {
    const { user, accessToken } = useAuth();
    const { setCurrentUser } = useActions();
    const { isGlobalLoading } = useLoading();

    const [getCurrentUser] = useLazyCurrentQuery();

    useEffect(() => {
        const fetchData = async () => {
            const { data, isSuccess } = await getCurrentUser(undefined);
            if (data && isSuccess) {
                setCurrentUser(data);
            }
        };

        if (!user && accessToken) {
            fetchData();
        }
    }, [accessToken, getCurrentUser, setCurrentUser, user]);

    return (
        <>
            {isGlobalLoading && <Loader />}
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
                            <Route
                                path="services"
                                element={<PrivateRoute children={<ServicesPage />} />}
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
