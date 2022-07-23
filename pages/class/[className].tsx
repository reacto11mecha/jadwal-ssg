import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import fs from "fs";

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

  const jadwal: allClassSchedule = JSON.parse(jadwalString);

  return {
    props: {
      jadwal: jadwal.find((kelas) => kelas.className === params.className),
    },
  };
};

const Jadwal = ({ jadwal }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>{JSON.stringify(jadwal)}</div>;
};

export default Jadwal;
