import { z } from "zod";

const dayValidation = z.number().positive().min(1).max(7);

// jadwal.json file typing start //
export const JadwalJson = z
  .array(
    z.object({
      className: z.string(),
      schedule: z.array(
        z.object({
          day: dayValidation,
          lessons: z.array(z.string()).nonempty(),
        })
      ),
    })
  )
  .nonempty();

export type allClassSchedule = z.infer<typeof JadwalJson>;

export type IIndividualClass = allClassSchedule[number];

export type ISchedule = IIndividualClass["schedule"][number];
// jadwal.json file typing end //

// waktu.json file typing start //
export const WaktuJson = z.object({
  TimeAllocation: z
    .array(
      z.object({
        alloc: z.array(
          z.object({
            JAM: z.number().optional(),
            isBreak: z.boolean().optional(),
            WAKTU: z.array(z.string()),
          })
        ),
        currentDay: dayValidation,
      })
    )
    .nonempty(),
  TZ: z.string(),
});

export type ITimeInfo = z.infer<typeof WaktuJson>;

export type ITimeAllocation = ITimeInfo["TimeAllocation"][number];
// waktu.json file typing end //
