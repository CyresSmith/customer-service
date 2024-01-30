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
  activities: string[];
  employees: [];
};

export interface CreateCompany
  extends Pick<
    Company,
    'name' | 'city' | 'index' | 'address' | 'activities' | 'phones'
  > {
  employeesCount: EmployeesCount;
  branches: Branches;
  category: string;
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
