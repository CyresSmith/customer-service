import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactElement;
};

const PrivateRoute = ({ children }: Props): React.ReactElement => {
  const { isLoggedIn, isLoading } = useAuth();

  const redirect: boolean | null =
    !isLoading && !isLoggedIn ? true : !isLoading && isLoggedIn ? false : null;

  return redirect ? <Navigate to="/" replace={true} /> : children;
};

export default PrivateRoute;
