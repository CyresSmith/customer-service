import { useCompany } from 'hooks/useCompany';
import Employee from './Employee/Employee';
import {
  ItemLayout,
  EmployeesCount,
  HeaderItem,
  EmployeesList,
} from './Employees.styled';

type Props = {};

const Employees = (props: Props) => {
  const { employees } = useCompany();

  return (
    <>
      <ItemLayout>
        <EmployeesCount>
          <HeaderItem>Кількість співробітників: {employees.length}</HeaderItem>
        </EmployeesCount>
        <div></div>
        <HeaderItem>Статус</HeaderItem>
      </ItemLayout>

      <EmployeesList>
        {employees.map(item => (
          <Employee key={item.id} employee={item} />
        ))}
      </EmployeesList>
    </>
  );

  // return (
  //   <ItemsList
  //     items={employees.map(
  //       ({ id, avatar, firstName, lastName, status, jobTitle, services }) => ({
  //         id,
  //         avatar,
  //         name: lastName ? firstName + ' ' + lastName : firstName,
  //         jobTitle,
  //         servicesCount: services.length,
  //         status,
  //       })
  //     )}
  //     onItemClick={id => console.log(id)}
  //   />
  // );
};

export default Employees;
