import { IEmployee } from "services/types/employee.types"
import { Avatar, AvatarWrapper, ListItem, Name, NoAvatarIcon, Position, TextBox } from "./EmployeesList.styled";
import { HiFaceSmile } from "react-icons/hi2";

type Props = {
    employee: IEmployee;
};

export const EmployeesListItem = ({ employee }: Props) => {
    const { avatar, firstName, lastName, jobTitle } = employee;
    
    return (
        <ListItem>
            <AvatarWrapper>
                {avatar ? 
                    <Avatar src={avatar} alt='Employee photo' /> :
                    <NoAvatarIcon as={HiFaceSmile} />
                }
            </AvatarWrapper>
            <TextBox>
                <Name>{lastName ? firstName + ' ' + lastName : firstName}</Name>
                <Position>{ jobTitle }</Position>   
            </TextBox>
        </ListItem>
    )
}