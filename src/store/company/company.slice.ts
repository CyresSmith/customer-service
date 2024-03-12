import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EmployeeRoleEnum } from 'services/types/employee.types';
import { Company } from './company.types';

type ICompanyInitialState = {
  company: Company;
  userRole: EmployeeRoleEnum;
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
    services: [],
  },
  userRole: EmployeeRoleEnum.USER,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(state, { payload }: PayloadAction<Company>) {
      return { ...state, company: payload };
    },
    setUserRole(state, { payload }: PayloadAction<EmployeeRoleEnum>) {
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
