import { useLoading } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useUserRole } from 'hooks/useUserRole';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { EmployeeRoleEnum } from 'services/types/employee.types';

type Props = {
    children: ReactElement;
    limitedAccess?: EmployeeRoleEnum[];
};

const PrivateRoute = ({ children, limitedAccess }: Props): React.ReactElement => {
    const { isLoggedIn, accessToken } = useAuth();
    const userRole = useUserRole();
    const { isGlobalLoading } = useLoading();

    const notAuthorized: boolean = !isLoggedIn && !isGlobalLoading && !accessToken ? true : false;

    let redirect: boolean = notAuthorized;

    if (limitedAccess && limitedAccess.length > 0)
        redirect = notAuthorized || !limitedAccess.includes(userRole);

    return redirect ? <Navigate to="/" replace={true} /> : children;
};

export default PrivateRoute;
