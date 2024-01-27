export interface IWorkTime {
  from: number;
  to: number;
}

export interface IWorkingHours {
  monday: IWorkTime;
  tuesday: IWorkTime;
  wednesday: IWorkTime;
  thursday: IWorkTime;
  friday: IWorkTime;
  saturday: IWorkTime;
  sunday: IWorkTime;
}

export type Branches = 'one' | 'more';
export type EmployeesCount = '2-5' | '6-9' | '10+';

export type Company = {
  id: string;
  name: string;
  phones: string[];
  city: string;
  address: string;
  index: string;
  workingHours: IWorkingHours;
  desc: string;
  avatar: string;
  images: string[];
  category: string;
  activities: string[];
  employeesCount: EmployeesCount;
  branches: Branches;
};

export interface CreateCompany
  extends Pick<
    Company,
    | 'name'
    | 'city'
    | 'index'
    | 'address'
    | 'category'
    | 'activities'
    | 'phones'
    | 'employeesCount'
    | 'branches'
  > {}

export interface CreateCompanyDto
  extends Pick<
    Company,
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
