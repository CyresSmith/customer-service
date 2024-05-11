import { Client } from './clients.types';
import { IEmployee } from './employee.types';
import { ServiceBasicInfo } from './service.type';

export type EventType = {
    id: number;
    year: number;
    month: number;
    day: number;
    time: string;
    duration: number;
    comments?: string | null;
    employee: Partial<IEmployee>;
    client: Partial<Client>;
    services: Partial<ServiceBasicInfo>[];
};

export type CreateEventType = {
    data: Omit<EventType, 'id' | 'employee' | 'client' | 'services'> & {
        employee: number;
        client: number;
        services: number[];
    };
    companyId: number;
};

export type GetMonthEvents = {
    companyId: number;
    year: number;
    month: number;
};
