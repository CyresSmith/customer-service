import { EmployeeBasicInfo } from 'services/types/employee.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import { List } from './EmployeesInfoList.styled';
import { EmployeesInfoListItem } from './EmployeesInfoListItem';

type Props = {
    employees: EmployeeBasicInfo[];
    date: Date;
    columns: number;
    isScroll: boolean;
    schedules: IMonthSchedule[];
};

const EmployeesInfoList = ({ employees, date, columns, isScroll, schedules }: Props) => {
    return (
        <List $columns={columns} $isScroll={isScroll}>
            {employees.map((employee, i) => (
                <EmployeesInfoListItem
                    key={i}
                    employee={employee}
                    last={i === employees.length - 1}
                    date={date}
                    schedules={schedules.filter(s => s.employee.id === +employee.id)}
                />
            ))}
        </List>
    );
};

export default EmployeesInfoList;
