export interface ITime {
  from: string;
  to: string;
}

export interface IWorkSchedule {
  hours: ITime;
  days: number[];
  break?: ITime;
}

export interface IEmployeeSchedule {
  year: number;
  month: number;
  schedule: IWorkSchedule;
  scheduleId?: number;
}
