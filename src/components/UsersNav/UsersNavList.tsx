import { useAppDispatch } from "hooks";
import { NavList, NavListItem, NavListItemLink, NavListItemBtn, StyledIcon } from "./UsersNav.styled";
import usersOperations from "store/users/usersOperations";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

const UsersNavList = () => {
    const dispatch = useAppDispatch();

    const handleLogout = (): void => {
        dispatch(usersOperations.logout());
    };

    return (
        <NavList>
            <NavListItem>
                <NavListItemLink to='#'>
                    <StyledIcon as={AiOutlineUser} />
                    Профіль
                </NavListItemLink>
            </NavListItem>
            <NavListItem>
                <NavListItemBtn onClick={handleLogout} type='button'>
                    <StyledIcon as={RiLogoutBoxRLine} />
                    Вийти
                </NavListItemBtn>
            </NavListItem>
        </NavList>
    )
};

export default UsersNavList;