// jadwal.json file typing start //
export interface ISchedule {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  lessons: string[];
}

export interface IIndividualClass {
  className: string;
  schedule: ISchedule[];
}

// Typing yang sebenarnya
export type allClassSchedule = IIndividualClass[];
// jadwal.json file typing end //

// waktu.json file typing start //
export type TAlloc = {
  JAM: number;
  WAKTU: string[];
};

export interface ITimeAllocation {
  alloc: TAlloc[];
  currentDay: ISchedule["day"];
}

// Typing yang sebenarnya
export type ITimeInfo = {
  TimeAllocation: ITimeAllocation[];
  TZ: string;
};
// waktu.json file typing end //
