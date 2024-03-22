// import { useCompany } from 'hooks/useCompany';
import Employee from './Employee/Employee';
import {
  ItemLayout,
  EmployeesCount,
  HeaderItem,
  EmployeesList,
} from './Employees.styled';
import { useEmployees } from 'hooks/useEmployees';

// type Props = {};

const Employees = () => {
  const { allEmployees } = useEmployees();

  return (
    <>
      <ItemLayout>
        <EmployeesCount>
          <HeaderItem>Кількість співробітників: {allEmployees.length}</HeaderItem>
        </EmployeesCount>
        <div></div>
        <HeaderItem>Статус</HeaderItem>
      </ItemLayout>

      <EmployeesList>
        {allEmployees.map(item => (
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
