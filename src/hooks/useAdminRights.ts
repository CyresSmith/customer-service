import { useTypedSelector } from './useTypedSelector';

export const useAdminRights = () =>
  useTypedSelector(state => {
    return (
      state.company.userRole === 'admin' || state.company.userRole === 'owner'
    );
  });
