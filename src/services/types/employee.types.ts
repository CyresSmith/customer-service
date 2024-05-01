// import { IMonthSchedule, ITime } from './schedule.types';

import { IMonthSchedule } from './schedule.types';
import { ServiceBasicInfo } from './service.type';

export type IEmployeeUser = {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string;
};

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

export type IEmployee = {
    id: number;
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
    birthday: Date;
    user: IEmployeeUser;
    schedules: IMonthSchedule[];
    services: ServiceBasicInfo[];
    isOnline: boolean;
};

export type BasicEmployeeInfo = Pick<
    IEmployee,
    'id' | 'avatar' | 'firstName' | 'lastName' | 'status' | 'jobTitle' | 'provider' | 'isOnline'
> & {
    servicesCount?: number;
    userId: number;
};

export type EmployeesState = {
    chosenEmployee: IEmployee | null;
    allEmployees: BasicEmployeeInfo[];
};

export type createEmployeeData = Pick<IEmployee, 'jobTitle' | 'provider' | 'role'>;

export type addExistUserEmployee = {
    userId: number;
    employeeData: createEmployeeData;
};

export type addExistUserEmployeeData = {
    companyId: number;
    data: addExistUserEmployee;
};

export type UserData = {
    id?: number;
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
    companyId: number;
    data: addNewUserEmployee;
};

export type UpdateEmployeeAvatar = {
    employeeId: number;
    companyId: number;
    data: FormData;
};

export type UpdateEmployeeProfile = Partial<Omit<IEmployee, 'id' | 'user' | 'avatar'>>;
