import { useAuth } from 'hooks/useAuth';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactElement;
};

const PrivateRoute = ({ children }: Props): React.ReactElement => {
  const { isLoggedIn } = useAuth();

  const redirect: boolean | null = !isLoggedIn
    ? true
    : isLoggedIn
    ? false
    : null;

  return redirect ? <Navigate to="/" replace={true} /> : children;
};

export default PrivateRoute;
