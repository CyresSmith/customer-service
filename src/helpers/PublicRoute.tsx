import { useAuth, useLoading } from 'hooks';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactElement;
};

const PublicRoute = ({ children }: Props): React.ReactElement => {
    const { isLoggedIn } = useAuth();
    const { isGlobalLoading } = useLoading();

    const redirect: boolean | null =
        !isGlobalLoading && !isLoggedIn ? false : !isGlobalLoading && isGlobalLoading ? true : null;

    return redirect ? children : <Navigate to="/workspace" replace={true} />;
};

export default PublicRoute;
