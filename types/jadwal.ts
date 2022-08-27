import { z } from "zod";

// Nilai yang merepresentasikan hari dari angka 1 (senin)
// Sampai angka 7 (minggu)
const dayValidation = z.number().positive().min(1).max(7);

// jadwal.json file typing start //
export const JadwalJson = z
  .array(
    z.object({
      // Nama masing-masing kelas.
      // Harus berbeda satu dengan lainnya.
      className: z.string(),

      schedule: z.array(
        z.object({
          day: dayValidation,

          // Array yang berisikan string jadwal
          // pelajaran siswa pada hari spesifik
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
            // Nilai dalam object ini pasti akan ada di antara
            // JAM atau isBreak. Jam akan menjelaskan pada jam
            // keberapa pelajaran berlangsung, sedangkan isBreak
            // akan menandakan dalam waktu istirahat telah tiba.

            JAM: z.number().optional(),
            isBreak: z.boolean().optional(),

            // Properti yang wajib ada
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
