import { useTypedSelector } from './useTypedSelector';

export const useSchedules = () => useTypedSelector(state => state.schedules);
