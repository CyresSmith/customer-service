import socketSlice from './chat/chat.slice';
import companySlice from './company/company.slice';
import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';

const rootActions = {
    ...userSlice.actions,
    ...loadingSlice.actions,
    ...companySlice.actions,
    ...socketSlice.actions,
};

export default rootActions;
