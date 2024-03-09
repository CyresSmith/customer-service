import { IEmployee } from 'services/types/employee.types';
import { List } from './EmployeesInfoList.styled';
import { EmployeesInfoListItem } from './EmployeesInfoListItem';

type Props = {
    employees: IEmployee[];
    date: Date;
    columns: number;
}

const EmployeesInfoList = ({ employees, date, columns }: Props) => {

    return (
        <List $columns={columns}>
            {employees.map((employee, i) =>
                <EmployeesInfoListItem key={i} employee={employee} last={i === employees.length - 1} date={date} />
            )}
        </List>
    )
};

export default EmployeesInfoList;