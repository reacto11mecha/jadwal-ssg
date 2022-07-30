import dynamic from "next/dynamic";
import { useDarkMode } from "@/context/darkMode";

import styles from "@/styles/Footer.module.css";

const BsGithub = dynamic(() =>
  import("react-icons/bs").then((mod) => mod.BsGithub)
);
const BsFillMoonFill = dynamic(() =>
  import("react-icons/bs").then((mod) => mod.BsFillMoonFill)
);
const BsSun = dynamic(() => import("react-icons/bs").then((mod) => mod.BsSun));

export const Footer = () => {
  const { isDarkTheme, toggleTheme } = useDarkMode();

  return (
    <footer className={styles.Footer}>
      <div className={styles.container}>
        <article className={`card ${styles.CardStyle}`}>
          <header>
            <a
              href="https://github.com/reacto11mecha/jadwal-ssg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub />
            </a>
          </header>
        </article>
        <button
          className={`card ${styles.CardStyle} ${styles.themeToggler}`}
          onClick={(e) => {
            toggleTheme();
            e.target.blur();
          }}
        >
          <header>{isDarkTheme ? <BsFillMoonFill /> : <BsSun />}</header>
        </button>
      </div>
    </footer>
  );
};
