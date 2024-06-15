import { Client } from './clients.types';
import { IEmployee } from './employee.types';
import { ServiceBasicInfo } from './service.type';

export type EventTime = {
    from: string;
    to: string;
};

export type EventType = {
    id: number;
    year: number;
    month: number;
    day: number;
    time: EventTime;
    duration: number;
    amount: number;
    comments?: string | null;
    employee: Pick<IEmployee, 'id' | 'firstName' | 'lastName' | 'jobTitle' | 'avatar'>;
    client: Pick<Client, 'id' | 'firstName' | 'lastName' | 'phone' | 'avatar'>;
    services: Pick<ServiceBasicInfo, 'id' | 'name' | 'price' | 'employeesSettings'>[];
};

export type CreateEventType = {
    data: Omit<EventType, 'id' | 'employee' | 'client' | 'services'> & {
        employee: number;
        client: number;
        services: number[];
    };
    companyId: number;
};

export type GetEvents = {
    companyId: number;
    year: number;
    month: number;
    day?: number;
};
