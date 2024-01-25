import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from './loading,type';

const initialState: LoadingState = {
  isGlobalLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.isGlobalLoading = payload;
    },
  },
});

export default loadingSlice;
