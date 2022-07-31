import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import path from "path";
import fs from "fs";

import Head from "next/head";
import styles from "@/styles/ClassSSG.module.css";
import { ScheduleCard } from "@/components/ScheduleCard";
import { Footer } from "@/components/Footer";

import { JadwalJson, WaktuJson } from "@/types/jadwal";
import type {
  allClassSchedule,
  IIndividualClass,
  ITimeInfo,
} from "@/types/jadwal";

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
    <>
      <div className={`flex one ${styles.Jadwal}`}>
        <Head>
          {/* prettier-ignore */}
          <title>{`Jadwal Pelajaran Kelas ${jadwal.className.replace("-", " ")}`}</title>
          <meta
            name="description"
            content={`Info lengkap tentang jadwal pelajaran kelas ${jadwal.className.replace(
              "-",
              " "
            )}`}
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div>
          <h1 className={styles.center}>
            Jadwal Pelajaran Kelas {jadwal.className.replace("-", " ")}
          </h1>
        </div>
        <div className={`flex one two-1000 ${styles.mainContent}`}>
          {jadwal.schedule.map((perDay) => (
            <ScheduleCard
              key={perDay.day}
              jadwal={jadwal}
              perDay={perDay}
              waktu={waktu}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jadwal;
