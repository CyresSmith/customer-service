// import { useCompany } from 'hooks/useCompany';
import Employee from './Employee/Employee';
import {
  EmployeesCount,
  EmployeesList,
  HeaderItem,
  ItemLayout,
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
};

export default Employees;
