import { BasicEmployeeInfo, IEmployee } from 'services/types/employee.types';
import { List } from './EmployeesList.styled';
import { EmployeesListItem } from './EmployeesListItem';
import { useLazyGetOneEmployeeQuery } from 'services/employee.api';

type Props = {
    employees: BasicEmployeeInfo[];
    chooseEmployee: React.Dispatch<React.SetStateAction<IEmployee | null>>;
    setStep: (step: string) => void;
    companyId: number;
};

const EmployeesList = ({ companyId, employees, chooseEmployee, setStep }: Props) => {
    const [getEmployeeQuery] = useLazyGetOneEmployeeQuery();

    const handleEmployeeClick = async (employeeId: number) => {
        const { data, isSuccess } = await getEmployeeQuery({ companyId, id: employeeId });

        if (data && isSuccess) {
            chooseEmployee(data);
            setStep('services');
        }
    };

    return (
        employees && (
            <List>
                {employees.map((e, i) => (
                    <EmployeesListItem
                        key={i}
                        employee={e}
                        handleClick={() => handleEmployeeClick(e.id)}
                    />
                ))}
            </List>
        )
    );
};

export default EmployeesList;
