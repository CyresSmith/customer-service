import { useAppDispatch } from "hooks";
import { NavList, NavListItem, NavListItemLink, NavListItemBtn, StyledIcon } from "./UsersNav.styled";
import usersOperations from "store/users/usersOperations";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
    handleClose: () => void;
};

const UsersNavList = ({handleClose}: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = (): void => {
        dispatch(usersOperations.logout());
        navigate('/', {replace: true});
    };

    return (
        <NavList>
            <NavListItem onClick={handleClose}>
                <NavListItemLink to='/workspace'>
                    <StyledIcon as={MdWorkOutline} />
                    Компанія
                </NavListItemLink>
            </NavListItem>
            <NavListItem onClick={handleClose}>
                <NavListItemLink to='#'>
                    <StyledIcon as={AiOutlineUser} />
                    Профіль
                </NavListItemLink>
            </NavListItem>
            <NavListItem onClick={handleClose}>
                <NavListItemBtn onClick={handleLogout} type='button'>
                    <StyledIcon as={RiLogoutBoxRLine} />
                    Вийти
                </NavListItemBtn>
            </NavListItem>
        </NavList>
    )
};

export default UsersNavList;