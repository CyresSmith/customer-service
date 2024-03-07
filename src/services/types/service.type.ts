import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction } from 'react';
import { IEmployee } from './employee.types';

export type EmployeeSettings = {
  employeeId: string;
  durationHours: SelectItem;
  durationMinutes: SelectItem;
  price?: number;
};

export type ServiceDataType = {
  avatar?: string;
  category: SelectItem | null;
  name: string;
  desc: string;
  employees: string[];
  resources?: string[];
  type: string;
  durationHours: SelectItem | null;
  durationMinutes: SelectItem | null;
  price: number;
  break: boolean;
  breakDuration?: SelectItem | null;
  capacity?: number;
  places?: number;
  employeesSettings: Partial<EmployeeSettings>[] | [];
  images?: string[];
};

export type AddServiceStepProps = {
  providers?: IEmployee[];
  setStep: Dispatch<SetStateAction<number>>;
  serviceData: ServiceDataType;
  setServiceData: Dispatch<SetStateAction<ServiceDataType>>;
};
