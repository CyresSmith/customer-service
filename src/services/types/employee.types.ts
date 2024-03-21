// import { IMonthSchedule, ITime } from './schedule.types';

import { IMonthSchedule } from "./schedule.types";
import { IService } from "./service.type";

export interface IEmployeeUser {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export enum EmployeeStatusEnum {
  WORKING = 'working',
  FIRED = 'fired',
}

export enum EmployeeRoleEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  USER = 'user',
}

export interface IEmployee {
  id: string;
  jobTitle: string;
  provider: boolean;
  role: EmployeeRoleEnum;
  status: EmployeeStatusEnum;
  avatar: string;
  info: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthday: string;
  user: IEmployeeUser;
  schedules: IMonthSchedule[];
  services: Partial<IService>[];
}

export type EmployeesState = {
  chosenEmployee: IEmployee | null;
  allEmployees: Partial<IEmployee>[];
}

export type createEmployeeData = Pick<
  IEmployee,
  'jobTitle' | 'provider' | 'role'
>;

export type addExistUserEmployee = {
  userId: string;
  employeeData: createEmployeeData;
};

export type addExistUserEmployeeData = {
  companyId: string;
  data: addExistUserEmployee;
};

export type UserData = {
  id?: string | number;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type addNewUserEmployee = {
  userData: UserData;
  employeeData: createEmployeeData;
};

export type addNewUserEmployeeData = {
  companyId: string;
  data: addNewUserEmployee;
};

export interface UpdateEmployeeAvatar {
  employeeId: string;
  companyId: string;
  data: FormData;
}

export type UpdateEmployeeProfile = Partial<
  Omit<IEmployee, 'id' | 'user' | 'avatar'>
>;
