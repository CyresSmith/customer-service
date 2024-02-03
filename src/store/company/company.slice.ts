import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Company } from './company.types';

const initialState: Company = {
  id: '',
  name: '',
  phones: [],
  city: '',
  address: '',
  index: '',
  workingHours: null,
  desc: '',
  avatar: '',
  images: [],
  activities: [],
  employees: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(_, { payload }: PayloadAction<Company>) {
      return payload;
    },
    setCompanyLogo(state, { payload }: PayloadAction<Pick<Company, 'avatar'>>) {
      return { ...state, ...payload };
    },
    resetCompanyState() {
      return initialState;
    },
  },
});

export default companySlice;
