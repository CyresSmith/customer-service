import { useAdminRights, useLoading } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactElement;
    onlyAdmin?: boolean;
};

const PrivateRoute = ({ children, onlyAdmin = false }: Props): React.ReactElement => {
    const { isLoggedIn, accessToken } = useAuth();
    const isAdmin = useAdminRights();
    const { isGlobalLoading } = useLoading();

    const notAuthorized: boolean = !isLoggedIn && !isGlobalLoading && !accessToken ? true : false;

    let redirect: boolean = notAuthorized;

    if (onlyAdmin) redirect = notAuthorized || !isAdmin;

    return redirect ? <Navigate to="/" replace={true} /> : children;
};

export default PrivateRoute;
