import { useAppSelector } from "hooks";
import { useState } from "react";
import { UsersEmail, NavWrapper, UsersOptions, UsersAvatarWrapper, UsersAvatar, UsersNoAvatar } from "./UsersNav.styled";
import Button from "components/Ui/Buttons/Button/Button";
import { CiMenuKebab } from "react-icons/ci";
import Dropdown from "components/Ui/Dropdown";
import UsersNavList from "./UsersNavLIst";

const UsersNav = () => {
    const [dropOpen, setDropOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.users.user);

    const openDropdown = (): void => {
        setDropOpen(true);
    };

    const closeDropdown = (): void => {
        setDropOpen(false)
    }

    return (
        <NavWrapper>
            <UsersOptions>
                <UsersAvatarWrapper>
                    {user?.avatar ? <UsersAvatar src={user?.avatar} /> : <UsersNoAvatar>{user?.firstName?.split('')[0]}</UsersNoAvatar>}
                </UsersAvatarWrapper>
                <UsersEmail>{user?.email}</UsersEmail>
                <Button name='dropdown' handleClick={openDropdown} Icon={CiMenuKebab} type="button" />
                {dropOpen && <Dropdown children={<UsersNavList />} $isOpen={dropOpen} closeDropdown={closeDropdown} />}
            </UsersOptions>
        </NavWrapper>
    )
};

export default UsersNav;