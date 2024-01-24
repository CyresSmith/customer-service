import { useTypedSelector } from './useTypedSelector';

export const useLoading = () => useTypedSelector(state => state.loading);
