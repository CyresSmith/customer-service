import { ICompanySchedule } from 'components/CompanyProfile/SetScheduleModal/SetScheduleModal';
import { IEmployee } from 'services/types/employee.types';
// import { IEmployee } from 'services/types/employee.types';
// import { ServiceBasicInfo } from 'services/types/service.type';

export type IWorkTime = {
    from: number;
    to: number;
};

export type Branches = 'one' | 'more';

export type EmployeesCount = '2-5' | '6-9' | '10+';

export type Activity = {
    id: number;
    name: string;
};

export type Company = {
    id: number;
    name: string;
    phones: string[];
    city: string;
    address: string;
    index: string;
    workingHours: IWorkingHours[] | null;
    desc: string;
    avatar: string;
    images: string[];
    activities: Activity[];
    employees: Pick<IEmployee, 'id' | 'role' | 'user'>[];
    // services: ServiceBasicInfo[];
};

export type CreateCompany = Pick<Company, 'name' | 'city' | 'index' | 'address' | 'phones'> & {
    employeesCount: EmployeesCount | '';
    branches: Branches | '';
    category: number;
    activities: number[];
};

export type CreateCompanyDto = Pick<
    CreateCompany,
    | 'name'
    | 'city'
    | 'index'
    | 'address'
    | 'category'
    | 'activities'
    | 'employeesCount'
    | 'branches'
> & {
    phone: string;
};

export type UpdateAvatar = {
    id: number;
    data: FormData;
};

type IUpdateCompanyProfileData = Omit<Company, 'avatar' | 'images' | 'activities'> & {
    activities: number[];
};

export type IUpdateCompanyProfile = {
    id: number;
    data: Partial<IUpdateCompanyProfileData>;
};

export type IWorkingHours = Pick<ICompanySchedule, 'days' | 'hours'>;
