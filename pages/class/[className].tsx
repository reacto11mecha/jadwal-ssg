import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import fs from "fs";

import { getDay } from "@/utils/getDay";
import styles from "@/styles/ClassSSG.module.css";

import type { allClassSchedule, IIndividualClass } from "@/types/jadwal";

export const getStaticPaths: GetStaticPaths = async () => {
  const jadwalPath = path.join(path.resolve(), "data", "jadwal.json");
  const jadwalString = fs.readFileSync(jadwalPath, "utf8");

  const jadwal: allClassSchedule = JSON.parse(jadwalString);

  return {
    paths: jadwal.map((kelas) => ({ params: { className: kelas.className } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const jadwalPath = path.join(path.resolve(), "data", "jadwal.json");
  const jadwalString = fs.readFileSync(jadwalPath, "utf8");

  const jadwal = JSON.parse(jadwalString) as allClassSchedule;
  const selectedClass = (jadwal as allClassSchedule).find(
    (kelas) => kelas.className === params!.className!
  )! as IIndividualClass;
  const actualSchedule = selectedClass.schedule;

  const longest = actualSchedule
    .map(({ lessons }) => lessons.length)
    .sort((a, b) => b - a)[0];
  const newArray = Array.from(new Array(longest));

  const remappedColumn = newArray.map((_, idx) =>
    actualSchedule.map((data) => ({
      lessons: data.lessons[idx] ?? null,
      index: selectedClass.schedule.findIndex((x) => x.day === data.day) + 1,
    }))
  );

  return {
    props: {
      jadwal: selectedClass,
      remappedColumn,
    },
  };
};

type remappedColumnReturnType = {
  lessons: string | null;
  index: number;
};

const Jadwal = ({
  jadwal,
  remappedColumn,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={`flex one ${styles.Jadwal}`}>
      <div>
        <h1 className={styles.center}>
          Jadwal Pelajaran Kelas {jadwal.className.replace("-", " ")}
        </h1>
      </div>
      <div className={styles.scrollableHorizontal}>
        <table className={styles.table}>
          <thead>
            <tr>
              {jadwal.schedule.map(({ day }: { day: number }) => (
                <th key={day} className={styles.center}>
                  {getDay(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {remappedColumn.map(
              (data: remappedColumnReturnType[], idx: number) => (
                <tr key={idx}>
                  {data.map((looped, idx) => (
                    <td key={idx}>{looped.lessons}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jadwal;
