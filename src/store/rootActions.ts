import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';
import clientsSlice from './clients/clients.slice';
import employeesSlice from './employees/employees.slice';
import schedulesSlice from './schedules/schedules.slice';

const rootActions = {
  ...userSlice.actions,
  ...loadingSlice.actions,
  ...companySlice.actions,
  ...clientsSlice.actions,
  ...employeesSlice.actions,
  ...schedulesSlice.actions,
};

export default rootActions;
