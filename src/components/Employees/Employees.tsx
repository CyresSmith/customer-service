import { useCompany } from 'hooks/useCompany';
import Employee from './Employee/Employee';
import {
  EmployeesCount,
  EmployeesList,
  HeaderItem,
  ItemLayout,
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
};

export default Employees;
