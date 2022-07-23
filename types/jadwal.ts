export interface ISchedule {
  day: number;
  lessons: string[];
}

export interface IIndividualClass {
  className: string;
  schedule: ISchedule[];
}

export type allClassSchedule = IIndividualClass[];
