import { ISchedule } from 'components/CompanyProfile/SetScheduleModal/SetScheduleModal';
import { Activity } from 'services/types/category.types';
import { IEmployee } from 'services/types/employee.types';

export interface IWorkTime {
  from: number;
  to: number;
}

export type Branches = 'one' | 'more';

export type EmployeesCount = '2-5' | '6-9' | '10+';

type Activity = {
  id: string;
  name: string;
};

export type Company = {
  id: string;
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
  employees: IEmployee[];
};

export interface CreateCompany
  extends Pick<Company, 'name' | 'city' | 'index' | 'address' | 'phones'> {
  employeesCount: EmployeesCount;
  branches: Branches;
  category: string;
  activities: string[];
}

export interface CreateCompanyDto
  extends Pick<
    CreateCompany,
    | 'name'
    | 'city'
    | 'index'
    | 'address'
    | 'category'
    | 'activities'
    | 'employeesCount'
    | 'branches'
  > {
  phone: string;
}

export interface UpdateAvatar {
  id: string;
  data: FormData;
}

interface IUpdateCompanyProfileData
  extends Omit<Company, 'avatar' | 'images' | 'activities'> {
  activities: string[];
}

export interface IUpdateCompanyProfile {
  id: string;
  data: Partial<IUpdateCompanyProfileData>;
}

export interface IWorkingHours extends Pick<ISchedule, 'days' | 'schedule'> {}
