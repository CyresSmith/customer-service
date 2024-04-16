import { SelectItem } from 'components/Ui/Form/types';
import { ServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { Dispatch, SetStateAction } from 'react';
import { BasicEmployeeInfo } from './employee.types';

export type EmployeeSettings = {
    employeeId: number;
    durationHours?: SelectItem;
    durationMinutes?: SelectItem;
    price?: number;
};

export type IEmployeeSettingsDto = Pick<EmployeeSettings, 'employeeId' | 'price'> & {
    duration?: number;
};

export type ServiceDataType = {
    avatar?: string;
    category: SelectItem | null;
    name: string;
    desc: string;
    employees: number[];
    resources?: number[];
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

export type INewServiceDtoType = Omit<
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
> & {
    category: number;
    duration: number;
    break: number;
    employeesSettings?: IEmployeeSettingsDto[];
    capacity?: number;
    placeLimit?: number;
};

export type IAddNewServiceDto = {
    companyId: number;
    data: INewServiceDtoType;
};

export type ServiceStepProps = {
    openModal: ServiceOpenModal;
    providers?: BasicEmployeeInfo[];
    setStep: Dispatch<SetStateAction<number>>;
    serviceData: ServiceDataType;
    setServiceData: Dispatch<SetStateAction<ServiceDataType>>;
    stateToCheck: ServiceDataType | null;
    handleServiceUpdate: (data: Partial<IServiceUpdate>) => void;
    isServiceUpdateLoading: boolean;
};

export type EmployeesServiceSettings = {
    employeeId: number;
    price?: number;
    duration?: number;
};

export type IService = {
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
    employees: BasicEmployeeInfo[];
    resources?: unknown;
    type: ServiceTypeEnum;
    capacity: number;
    placeLimit: number;
};

export type IServiceUpdate = Omit<IService, 'category' | 'employees' | 'type'> & {
    category: number;
    employees: number[];
    type: string;
};

export type ServiceBasicInfo = Pick<
    IService,
    'id' | 'name' | 'avatar' | 'duration' | 'price' | 'type' | 'category' | 'employeesSettings'
>;
