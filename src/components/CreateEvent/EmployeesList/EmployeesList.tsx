import { IEmployee } from "services/types/employee.types";
import { List } from "./EmployeesList.styled";
import { EmployeesListItem } from "./EmployeesListItem";

type Props = {
    employees: IEmployee[];
}

const EmployeesList = ({ employees }: Props) => {
    return employees && (
        <List>
            {employees.map((e, i) => 
                <EmployeesListItem key={i} employee={e} />
            )}
        </List>
    )
};

export default EmployeesList;