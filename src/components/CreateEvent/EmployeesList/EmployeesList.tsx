import ItemsList from 'components/Ui/ItemsList';
import { useLazyGetOneEmployeeQuery } from 'services/employee.api';
import { BasicEmployeeInfo, IEmployee } from 'services/types/employee.types';

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
            <ItemsList
                items={employees.map(({ id, firstName, lastName, avatar, jobTitle }) => ({
                    id,
                    name: firstName + ' ' + lastName,
                    avatar,
                    jobTitle,
                }))}
                onItemClick={id => handleEmployeeClick(id)}
                nameColumnTitle="Ім'я"
                keyForSelect="jobTitle"
            />
        )
    );
};

export default EmployeesList;
