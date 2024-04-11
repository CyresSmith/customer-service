import { BasicEmployeeInfo } from 'services/types/employee.types';
import { List } from './EmployeesList.styled';
import { EmployeesListItem } from './EmployeesListItem';

type Props = {
    employees: BasicEmployeeInfo[];
    chooseEmployee: React.Dispatch<React.SetStateAction<BasicEmployeeInfo | null>>;
    setStep: (step: string) => void;
};

const EmployeesList = ({ employees, chooseEmployee, setStep }: Props) => {
    const handleEmployeeClick = (e: BasicEmployeeInfo) => {
        chooseEmployee(e);
        setStep('services');
    };

    return (
        employees && (
            <List>
                {employees.map((e, i) => (
                    <EmployeesListItem key={i} employee={e} handleClick={handleEmployeeClick} />
                ))}
            </List>
        )
    );
};

export default EmployeesList;
