import { useTypedSelector } from './useTypedSelector';

export const useUserRole = () => useTypedSelector(state => state.company.userRole);
