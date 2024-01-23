// import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { lazy, useEffect } from "react";
import { useAppDispatch } from "hooks";
import usersOperations from "store/users/usersOperations";
import PrivateRoute from "helpers/PrivateRoute";
import PublicRoute from "helpers/PublicRoute";

const HomePage = lazy(() => import('../src/pages/Home'));
const WorkPage = lazy(() => import('../src/pages/Workspace'));
const ErrorPage = lazy(() => import('../src/pages/ErrorPage'))

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersOperations.current());
  }, [dispatch]);

    return (
      <>
        {/* <ToastContainer position="top-center" /> */}
  
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PublicRoute children={<HomePage />} />} />
            <Route path='/workspace' element={<PrivateRoute children={<WorkPage />} />} />
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
