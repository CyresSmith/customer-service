import { useTypedSelector } from './useTypedSelector';

export const useCompany = () =>
  useTypedSelector(state => state.schedules);