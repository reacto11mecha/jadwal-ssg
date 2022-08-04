import type { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import fs from "fs";

import styles from "@/styles/Home.module.css";

import type { IFooter } from "@/components/Footer";
import { type allClassSchedule, JadwalJson } from "@/types/jadwal";

const Footer = dynamic<IFooter>(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async () => {
  const jadwalPath = path.join(path.resolve(), "data", "jadwal.json");
  const jadwalString = fs.readFileSync(jadwalPath, "utf8");

  const jadwal = await JadwalJson.parseAsync(JSON.parse(jadwalString));

  return {
    props: {
      classLists: jadwal.map((jadwal) => jadwal.className),
    },
  };
};

const Home = ({
  classLists,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>
    <Head>
      <title>Daftar Jadwal Pelajaran SMA Negeri 12 Kota Bekasi</title>
      <meta
        name="description"
        content="Daftar jadwal pelajaran SMAN 12 Bekasi"
      />
    </Head>
    <header className={styles.header}>
      <h1>Daftar Jadwal Pelajaran</h1>
      <h2>Tahun Ajaran 2022/2023</h2>
      <h3>SMA Negeri 12 Kota Bekasi</h3>
    </header>
    <hr className={styles.horizontalRuler} />
    <main className={styles.mainContent}>
      <ul
        className={`flex one two-500 three-600 four-800 ${styles.jadwalList}`}
      >
        {classLists.map((className: string) => (
          <li key={className} className={styles.listItem}>
            <Link href={`/class/${className}`}>
              <a>Jadwal Kelas {className.replace("-", " ")}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
    <Footer />
  </div>
);

export default Home;
