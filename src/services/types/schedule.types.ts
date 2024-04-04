export type ITime = {
    from: string;
    to: string;
};

export type IDaySchedule = {
    hours: ITime;
    breakHours?: ITime;
    day: number;
};

export type IMonthSchedule = {
    id?: number;
    year: number;
    month: number;
    schedule: IDaySchedule[];
    employee: { id: number };
};

export type IUpdateEmployeeSchedule = {
    companyId: number;
    employeeId: number;
    data: IMonthSchedule;
};

export type IGetEmployeeSchedule = {
    companyId: number;
    employeeId: number;
    year: number;
    month: number;
};

export type SchedulesState = {
    chosenSchedule: IMonthSchedule | null;
    schedules: IMonthSchedule[];
};

export type DeletingSchedule = {
    companyId: number;
    employeeId: number;
    scheduleId: number;
};
