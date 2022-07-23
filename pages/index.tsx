import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import fs from "fs";

import styles from "../styles/Home.module.css";

import type { allClassSchedule } from "../types/jadwal";

export const getStaticProps: GetStaticProps = async () => {
  const jadwalPath = path.join(path.resolve(), "data", "jadwal.json");
  const jadwalString = fs.readFileSync(jadwalPath, "utf8");

  const jadwal: allClassSchedule = JSON.parse(jadwalString);

  return {
    props: {
      classLists: jadwal.map((jadwal) => jadwal.className),
    },
  };
};

const Home = ({
  classLists,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>Daftar Jadwal Pelajaran</title>
        <meta name="description" content="Daftar jadwal pelajaran" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Daftar Jadwal Pelajaran</h1>
        <h2>Tahun Ajaran 2022/2023</h2>
        <h3>SMA Negeri 12 Kota Bekasi</h3>
      </header>
      <hr className={styles.horizontalRuler} />
      <main>
        <ul
          className={`flex one two-500 three-600 four-800 ${styles.jadwalList}`}
        >
          {classLists.map((className) => (
            <li key={className} className={styles.listItem}>
              <Link href={`/class/${className}`}>
                <a>Jadwal Kelas {className.replace("-", " ")}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
