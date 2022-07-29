import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import path from "path";
import fs from "fs";

import styles from "@/styles/ClassSSG.module.css";
import { ScheduleCard } from "@/components/ScheduleCard";

import type {
  allClassSchedule,
  IIndividualClass,
  ITimeInfo,
} from "@/types/jadwal";

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
  const dataPath = path.join(path.resolve(), "data");

  const jadwalPath = path.join(dataPath, "jadwal.json");
  const jadwalString = fs.readFileSync(jadwalPath, "utf8");

  const waktuPath = path.join(dataPath, "waktu.json");
  const waktuString = fs.readFileSync(waktuPath, "utf8");

  const jadwal = JSON.parse(jadwalString) as allClassSchedule;
  const selectedClass = (jadwal as allClassSchedule).find(
    (kelas) => kelas.className === params!.className!
  )! as IIndividualClass;

  const waktu = JSON.parse(waktuString) as ITimeInfo;

  return {
    props: {
      jadwal: selectedClass,
      waktu,
    },
  };
};

const Jadwal = ({
  jadwal,
  waktu,
}: InferGetStaticPropsType<typeof getStaticProps> & {
  jadwal: IIndividualClass;
  waktu: ITimeInfo;
}) => {
  return (
    <div className={`flex one ${styles.Jadwal}`}>
      <div>
        <h1 className={styles.center}>
          Jadwal Pelajaran Kelas {jadwal.className.replace("-", " ")}
        </h1>
      </div>
      <div className="flex one two-1000">
        {jadwal.schedule.map((perDay) => (
          <ScheduleCard key={perDay.day} perDay={perDay} waktu={waktu} />
        ))}
      </div>
    </div>
  );
};

export default Jadwal;
