import { IEmployee } from "services/types/employee.types"
import { Avatar, AvatarWrapper, ListItem, Name, NoAvatarIcon } from "./EmployeesList.styled";
import { RxAvatar } from "react-icons/rx";

type Props = {
    employee: IEmployee;
};

export const EmployeesListItem = ({ employee }: Props) => {
    const { avatar, firstName, lastName } = employee;
    
    return (
        <ListItem>
            <AvatarWrapper>
                {avatar ? 
                    <Avatar src={avatar} alt='Employee photo' /> :
                    <NoAvatarIcon as={RxAvatar} />
                }
            </AvatarWrapper>
            <Name>{ lastName ? firstName + ' ' + lastName : firstName }</Name>
        </ListItem>
    )
}