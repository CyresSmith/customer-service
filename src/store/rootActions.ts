import loadingSlice from './loading/loading.slice';
import userSlice from './user/user.slice';

const rootActions = {
  ...userSlice.actions,
  ...loadingSlice.actions,
};

export default rootActions;
