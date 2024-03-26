import { IEmployee } from 'services/types/employee.types';
import {
  EmployeeDataBox,
  EmployeeImg,
  JobTitle,
  Name,
} from './SecondStep/SecondStep.styled';

export interface IEmployeeData extends IEmployee {
  checkIcon?: boolean;
}

const EmployeeData = ({
  avatar,
  firstName,
  jobTitle,
  lastName,
  checkIcon = true,
}: IEmployeeData) => {
  return (
    <EmployeeDataBox $checkIcon={checkIcon}>
      <EmployeeImg>
        {avatar ? (
          <img src={avatar} alt={`photo of ${firstName} ${lastName}`} />
        ) : (
          <p>{firstName?.slice(0, 1)}</p>
        )}
      </EmployeeImg>

      <Name>
        {firstName} {lastName && lastName}
        <br />
        <JobTitle>{jobTitle}</JobTitle>
      </Name>
    </EmployeeDataBox>
  );
};

export default EmployeeData;
