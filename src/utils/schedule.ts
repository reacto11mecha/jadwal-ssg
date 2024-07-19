import { z } from "zod";

// Nilai yang merepresentasikan hari dari angka 1 (senin)
// Sampai angka 7 (minggu)
const dayValidation = z.number().positive().min(1).max(7);

// jadwal-siswa.json file typing start //
export const JadwalStudentJson = z
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
                lesson: z.string().nullish(),
                name: z.string().nullish(),
              }),
            )
            .nonempty(),
        }),
      ),
    }),
  )
  .nonempty();

export type allClassScheduleStudent = z.infer<typeof JadwalStudentJson>;

export type IIndividualClassStudent = allClassScheduleStudent[number];

export type IScheduleStudent = IIndividualClassStudent["schedules"][number];
// jadwal-siswa.json file typing end //

// jadwal-teacher.json file typing start //
export const JadwalTeacherJson = z
  .array(
    z.object({
      // Nama masing-masing guru.
      teacherName: z.string(),

      // Alokasi nomor bagi masing-masing guru.
      // Berfungsi sebagai penanda.
      teacherId: z.number(),

      className: z.array(
        z.object({
          currentDay: dayValidation,

          // Array yang berisikan object jadwal
          // guru mengajar siswa pada hari spesifik
          alloc: z
            .array(
              z.object({
                kelas: z.string().optional(),
                isBreak: z.boolean().optional(),
              }),
            )
            .nonempty(),
        }),
      ),
    }),
  )
  .nonempty();

export type allTeacherStudent = z.infer<typeof JadwalTeacherJson>;

export type IIndividualTeacher = allTeacherStudent[number];
// jadwal-teacher.json file typing end //

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
          }),
        ),
        currentDay: dayValidation,
      }),
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
    case 7:
      return "SABTU";
    case 8:
      return "MINGGU";

    default:
      return "N/A";
  }
};
