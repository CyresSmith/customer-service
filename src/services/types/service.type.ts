import { Dispatch, SetStateAction } from 'react';

export type EmployeeSettings = {
  employeeId: number;
  duration: number;
  price: number;
};

export type ServiceDataType = {
  avatar?: string;
  category: string;
  name: string;
  desc: string;
  employees: number[];
  resources?: number[];
  type: string;
  duration: number;
  price: number;
  break?: number;
  capacity?: number;
  places?: number;
  employeesSettings?: EmployeeSettings[];
  images?: string[];
};

export type AddServiceStepProps = {
  setStep: Dispatch<SetStateAction<number>>;
  serviceData: Partial<ServiceDataType> | null;
  setServiceData: Dispatch<SetStateAction<Partial<ServiceDataType>>>;
};
