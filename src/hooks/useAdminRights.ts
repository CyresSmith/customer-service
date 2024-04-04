import { EmployeeRoleEnum } from 'services/types/employee.types';
import { useTypedSelector } from './useTypedSelector';

export const useAdminRights = () =>
    useTypedSelector(state => {
        return (
            state.company.userRole === EmployeeRoleEnum.ADMIN ||
            state.company.userRole === EmployeeRoleEnum.OWNER
        );
    });
