import { useAppSelector } from "hooks";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactElement;
};

const PublicRoute = ({children}: Props): React.ReactElement => {
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
    const isLoading = useAppSelector((state) => state.users.isLoading);

    const redirect: boolean | null = !isLoading && !isLoggedIn ? false : !isLoading && isLoading ? true : null;

    return redirect ? children : <Navigate to='/workspace' replace={true} />;
};

export default PublicRoute;