import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';
import clientsSlice from './clients/clients.slice';

const rootActions = {
  ...userSlice.actions,
  ...loadingSlice.actions,
  ...companySlice.actions,
  ...clientsSlice.actions,
};

export default rootActions;
