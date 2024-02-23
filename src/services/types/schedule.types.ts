export interface ITime {
  from: string;
  to: string;
}

export interface IWorkSchedule {
  hours: ITime;
  days: number[];
  breakHours?: ITime;
}

export interface IEmployeeSchedule {
  year: number;
  month: number;
  schedule: IWorkSchedule;
  id?: number;
}
