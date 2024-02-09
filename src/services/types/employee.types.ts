export interface IEmployeeUser {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface IEmployee {
  id: string;
  jobTitle: string;
  provider: boolean;
  role: string;
  status: string;
  avatar: string;
  info: string;
  user: IEmployeeUser;
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
  id: string;
  data: addExistUserEmployee;
};

export type UserData = {
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
  id: string;
  data: addNewUserEmployee;
};
