import { HiFaceSmile } from 'react-icons/hi2';
import { IEmployee } from 'services/types/employee.types';
import {
  Avatar,
  AvatarWrapper,
  ListItem,
  Name,
  NoAvatarIcon,
  Position,
  TextBox,
} from './EmployeesList.styled';

type Props = {
  employee: IEmployee;
  handleClick: (e: IEmployee) => void;
};

export const EmployeesListItem = ({ employee, handleClick }: Props) => {
  const { avatar, firstName, lastName, jobTitle } = employee;

  return (
    <ListItem onClick={() => handleClick(employee)}>
      <AvatarWrapper>
        {avatar ? (
          <Avatar src={avatar} alt="Employee photo" />
        ) : (
          <NoAvatarIcon as={HiFaceSmile} />
        )}
      </AvatarWrapper>
      <TextBox>
        <Name>{lastName ? firstName + ' ' + lastName : firstName}</Name>
        <Position>{jobTitle}</Position>
      </TextBox>
    </ListItem>
  );
};
