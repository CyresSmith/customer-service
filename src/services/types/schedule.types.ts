export interface ITime {
  from: string;
  to: string;
}

export interface IDaySchedule {
  hours: ITime;
  breakHours?: ITime;
  day: number;
}

export interface IMonthSchedule {
  id?: number;
  year: number;
  month: number;
  schedule: IDaySchedule[];
}

export interface IUpdateEmployeeSchedule {
  companyId: string;
  employeeId: string;
  data: IMonthSchedule;
}

export interface IGetEmployeeSchedule {
  companyId: string;
  employeeId: string;
  year: number;
  month: number;
}

export type SchedulesState = {
  chosenSchedule: IMonthSchedule | null;
  schedules: IMonthSchedule[];
}