import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Company } from './company.types';

type ICompanyInitialState = {
  company: Company;
  userRole: string;
};

const initialState: ICompanyInitialState = {
  company: {
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
  },
  userRole: 'user',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(state, { payload }: PayloadAction<Company>) {
      return { ...state, company: payload };
    },
    setUserRole(state, { payload }: PayloadAction<string>) {
      return { ...state, userRole: payload };
    },
    setCompanyLogo(state, { payload }: PayloadAction<Pick<Company, 'avatar'>>) {
      return { ...state, company: { ...state.company, ...payload } };
    },
    setCompanySchedule(
      state,
      { payload }: PayloadAction<Pick<Company, 'workingHours'>>
    ) {
      return { ...state, company: { ...state.company, ...payload } };
    },
    updateCompanyData(state, { payload }: PayloadAction<Partial<Company>>) {
      return { ...state, company: { ...state.company, ...payload } };
    },
    resetCompanyState() {
      return initialState;
    },
  },
});

export default companySlice;
