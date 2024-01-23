import AuthNav from "components/AuthNav";
import { TopBarWrapper, Logo } from "./TopBar.styled";
import { useAppSelector } from "hooks";
import UsersNav from "components/UsersNav";

type Props = {
    openModal?: (arg: string) => void,
}

const TopBar = ({openModal}: Props) => {
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
    const isLoading = useAppSelector((state) => state.users.isLoading);

    return(
        <TopBarWrapper>
            <Logo to='/'>LOGO</Logo>
            {isLoggedIn && !isLoading ? <UsersNav/> : !isLoggedIn && !isLoading ? <AuthNav openModal={openModal}/> : null}
        </TopBarWrapper>
    )
};

export default TopBar;