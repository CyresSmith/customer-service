import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';
import employeesSlice from './employees/employees.slice';
import schedulesSlice from './schedules/schedules.slice';

const rootActions = {
  ...userSlice.actions,
  ...loadingSlice.actions,
  ...companySlice.actions,
  ...employeesSlice.actions,
  ...schedulesSlice.actions,
};

export default rootActions;
