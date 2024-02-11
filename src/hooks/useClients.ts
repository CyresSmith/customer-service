import { useTypedSelector } from './useTypedSelector';

export const useClients = () =>
  useTypedSelector(state => state.clients);