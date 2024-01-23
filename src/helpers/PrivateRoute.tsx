import { useAppSelector } from "hooks";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactElement;
};

const PrivateRoute = ({children}: Props): React.ReactElement => {
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
    const isLoading = useAppSelector((state) => state.users.isLoading);

    const redirect: boolean = !isLoading && !isLoggedIn ? true : false;

    return redirect ? <Navigate to='/' replace={true} /> : children;
};

export default PrivateRoute;