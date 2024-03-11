import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction } from 'react';
import { IEmployee } from './employee.types';

export type EmployeeSettings = {
  employeeId: string;
  durationHours: SelectItem;
  durationMinutes: SelectItem;
  price?: number;
};

export interface IEmployeeSettingsDto
  extends Pick<EmployeeSettings, 'employeeId' | 'price'> {
  duration?: number;
}

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
  employeesSettings: Partial<EmployeeSettings>[] | [];
  images?: string[];
  capacityLimit: boolean;
  capacity: number;
  placesLimit: boolean;
  placeLimit: number;
};

export interface INewServiceDtoType
  extends Omit<
    ServiceDataType,
    | 'category'
    | 'durationHours'
    | 'durationMinutes'
    | 'break'
    | 'breakDuration'
    | 'employeesSettings'
    | 'capacityLimit'
    | 'capacity'
    | 'placesLimit'
    | 'placeLimit'
  > {
  category: string;
  duration: number;
  break: number;
  employeesSettings?: IEmployeeSettingsDto[];
  capacity?: number;
  placeLimit?: number;
}

export interface IAddNewServiceDto {
  companyId: nu;
}

export type AddServiceStepProps = {
  providers?: IEmployee[];
  setStep: Dispatch<SetStateAction<number>>;
  serviceData: ServiceDataType;
  setServiceData: Dispatch<SetStateAction<ServiceDataType>>;
};
