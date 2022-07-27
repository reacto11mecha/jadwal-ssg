export interface ISchedule {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  lessons: string[];
}

export interface IIndividualClass {
  className: string;
  schedule: ISchedule[];
}

export type allClassSchedule = IIndividualClass[];

export type TAlloc = {
  JAM: number;
  WAKTU: string[];
};

export interface ITimeAllocation {
  alloc: TAlloc[];
  currentDay: ISchedule["day"];
}

export type ITimeInfo = {
  TimeAllocation: ITimeAllocation[];
  TZ: string;
};
