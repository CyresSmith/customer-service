// import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { lazy } from "react";

const HomePage = lazy(() => import('../src/pages/Home'));
const ErrorPage = lazy(() => import('../src/pages/ErrorPage'))

function App() {
    return (
      <>
        {/* <ToastContainer position="top-center" /> */}
  
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="authentication" element={<PublicRoute><AuthPage /></PublicRoute>} />
            <Route path="tests" element={<PrivatRoute><TestSPage /></PrivatRoute>} />
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
