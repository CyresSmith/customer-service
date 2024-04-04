import { useLoading } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactElement;
};

const PrivateRoute = ({ children }: Props): React.ReactElement => {
    const { isLoggedIn, accessToken } = useAuth();
    const { isGlobalLoading } = useLoading();

    const redirect: boolean = !isLoggedIn && !isGlobalLoading && !accessToken ? true : false;

    return redirect ? <Navigate to="/" replace={true} /> : children;
};

export default PrivateRoute;
