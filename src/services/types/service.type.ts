import { SelectItem } from 'components/Ui/Form/types';
import { ServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { Dispatch, SetStateAction } from 'react';
import { IEmployee } from './employee.types';

export type EmployeeSettings = {
  employeeId: string;
  durationHours?: SelectItem;
  durationMinutes?: SelectItem;
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
  employeesSettings: EmployeeSettings[] | [];
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
  category: number;
  duration: number;
  break: number;
  employeesSettings?: IEmployeeSettingsDto[];
  capacity?: number;
  placeLimit?: number;
}

export interface IAddNewServiceDto {
  companyId: string;
  data: INewServiceDtoType;
}

export type ServiceStepProps = {
  openModal: ServiceOpenModal;
  providers?: IEmployee[];
  setStep: Dispatch<SetStateAction<number>>;
  serviceData: ServiceDataType;
  setServiceData: Dispatch<SetStateAction<ServiceDataType>>;
  stateToCheck: ServiceDataType;
  handleServiceUpdate: (data: Partial<IServiceUpdate>) => void;
};

export type EmployeesServiceSettings = {
  employeeId: number;
  price?: number;
  duration?: number;
};

export interface IService {
  id: number;
  name: string;
  avatar: string;
  duration: number;
  break: number | null;
  price: number;
  desc: string;
  employeesSettings: EmployeesServiceSettings[];
  images: string[];
  category: { id: number; name: string; type: string };
  employees: IEmployee[];
  resources?: unknown;
  type: ServiceTypeEnum;
  capacity: number;
  placeLimit: number;
}

export interface IServiceUpdate
  extends Omit<IService, 'category' | 'employees' | 'type'> {
  category: number;
  employees: string[];
  type: string;
}

export type ServiceBasicInfo = Pick<
  IService,
  'id' | 'name' | 'avatar' | 'duration' | 'price' | 'type' | 'category'
>;
