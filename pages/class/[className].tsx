import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import path from "path";
import fs from "fs";

import Head from "next/head";
import styles from "@/styles/ClassSSG.module.css";
import { ScheduleCard } from "@/components/ScheduleCard";

import { JadwalJson, WaktuJson } from "@/types/jadwal";
import type { IFooter } from "@/components/Footer";
import type {
  allClassSchedule,
  IIndividualClass,
  ITimeInfo,
} from "@/types/jadwal";

const Footer = dynamic<IFooter>(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  { ssr: false }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const jadwalPath = path.join(path.resolve(), "data", "jadwal.json");
  const jadwalString = fs.readFileSync(jadwalPath, "utf8");

  const jadwal = await JadwalJson.parseAsync(JSON.parse(jadwalString));

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

  const jadwal = await JadwalJson.parseAsync(JSON.parse(jadwalString));
  const selectedClass = jadwal.find(
    (kelas) => kelas.className === params!.className!
  )!;

  const waktu = await WaktuJson.parseAsync(JSON.parse(waktuString));

  return {
    props: {
      currentClassSchedule: selectedClass,
      allClass: jadwal.map((individualClass) => individualClass.className),
      waktu,
    },
  };
};

const Jadwal = ({
  currentClassSchedule,
  allClass,
  waktu,
}: InferGetStaticPropsType<typeof getStaticProps> & {
  currentClassSchedule: IIndividualClass;
  allClass: string[];
  waktu: ITimeInfo;
}) => {
  return (
    <>
      <div className={`flex one ${styles.Jadwal}`}>
        <Head>
          {/* prettier-ignore */}
          <title>{`Jadwal Pelajaran Kelas ${currentClassSchedule.className.replace("-", " ")}`}</title>
          <meta
            name="description"
            content={`Info lengkap tentang jadwal pelajaran kelas ${currentClassSchedule.className.replace(
              "-",
              " "
            )}`}
          />
        </Head>
        <div>
          <h1 className={styles.center}>
            Jadwal Pelajaran Kelas{" "}
            {currentClassSchedule.className.replace("-", " ")}
          </h1>
        </div>
        <div className={`flex one two-1000 ${styles.mainContent}`}>
          {currentClassSchedule.schedule.map((perDay) => (
            <ScheduleCard
              key={perDay.day}
              perDay={perDay}
              waktu={
                waktu.TimeAllocation.find(
                  (time) => time.currentDay === perDay.day
                )!
              }
              jadwal={currentClassSchedule}
              Timezone={waktu.TZ}
            />
          ))}
        </div>
      </div>
      <Footer
        showDropdown={true}
        allClass={allClass}
        currentClassSchedule={currentClassSchedule}
      />
    </>
  );
};

export default Jadwal;
