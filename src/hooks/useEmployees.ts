import { useTypedSelector } from './useTypedSelector';

export const useEmployees = () =>
  useTypedSelector(state => state.employees);