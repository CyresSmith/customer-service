import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';

const rootActions = {
    ...userSlice.actions,
    ...loadingSlice.actions,
    ...companySlice.actions,
};

export default rootActions;
