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
  employee: { id: number };
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
  companyId: number;
  employeeId: number;
  year: number;
  month: number;
}

export type SchedulesState = {
  chosenSchedule: IMonthSchedule | null;
  schedules: IMonthSchedule[];
}

export type DeletingSchedule = {
  companyId: number,
  employeeId: number,
  scheduleId: number
}