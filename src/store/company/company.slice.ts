import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Company } from './company.types';

const initialState: Company = {
  id: '',
  name: '',
  phones: [],
  city: '',
  address: '',
  index: '',
  workingHours: {
    monday: { from: 0, to: 0 },
    tuesday: { from: 0, to: 0 },
    wednesday: { from: 0, to: 0 },
    thursday: { from: 0, to: 0 },
    friday: { from: 0, to: 0 },
    saturday: { from: 0, to: 0 },
    sunday: { from: 0, to: 0 },
  },
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
