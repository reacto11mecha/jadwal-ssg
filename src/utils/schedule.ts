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

      schedules: z.array(
        z.object({
          day: dayValidation,

          // Array yang berisikan string jadwal
          // pelajaran siswa pada hari spesifik
          lessons: z
            .array(
              z.object({
                lesson: z.string(),
                name: z.string().optional(),
              })
            )
            .nonempty(),
        })
      ),
    })
  )
  .nonempty();

export type allClassSchedule = z.infer<typeof JadwalJson>;

export type IIndividualClass = allClassSchedule[number];

export type ISchedule = IIndividualClass["schedules"][number];
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

export const getDay = (day: number) => {
  switch (day) {
    case 1:
      return "SENIN";
    case 2:
      return "SELASA";
    case 3:
      return "RABU";
    case 4:
      return "KAMIS";
    case 5:
      return "JUM'AT";
      break;
    case 7:
      return "SABTU";
    case 8:
      return "MINGGU";

    default:
      return "N/A";
  }
};
