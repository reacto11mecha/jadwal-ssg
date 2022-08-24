import Head from "next/head";
import Link from "next/link";

import styles from "@/styles/Offline.module.css";

export default function Offline() {
  return (
    <>
      <Head>
        <title>Kamu offline</title>
      </Head>
      <div className={styles.container}>
        <div>
          <article className={`card ${styles.card}`}>
            <footer>
              <div>
                <h3>Kamu Sedang Offline</h3>

                <p>Coba kembali online dan kunjungi lagi website ini.</p>
              </div>
            </footer>
            <header>
              <Link href="/">Kembali ke halaman utama</Link>
            </header>
          </article>
        </div>
      </div>
    </>
  );
}
