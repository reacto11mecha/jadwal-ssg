import { useState, useEffect } from "react";

import { BsGithub, BsFillMoonFill, BsSun } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  currentClass: string;
  classList: string[];
};

export const ClassNavigator = ({ currentClass, classList }: Props) => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;

    setDarkMode(nextDark);

    if (nextDark) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <footer className="fixed inset-x-0 bottom-0 border-t border-zinc-300/50 dark:shadow dark:shadow-white dark:border-sm dark:border-transparent border-solid w-full backdrop-blur-sm">
      <div className="flex flex-wrap h-full items-center justify-center">
        <div className="flex text-xl gap-5 p-3">
          <select
            className="border-zinc-300 min-h-[2em] dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md"
            value={currentClass}
            onChange={(e) => {
              document.location = `/student/${e.target.value}`;
            }}
          >
            {classList.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          <a
            className="border-zinc-300 px-3 dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex items-center"
            href="/student"
            onClick={() => {
              localStorage.removeItem("favorite-class");
            }}
          >
            <IoMdArrowRoundBack />
          </a>
          <a
            href="https://github.com/reacto11mecha/jadwal-ssg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Halaman repositori github kode website ini"
            className="border-zinc-300 px-3 dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex justify-center items-center"
          >
            <BsGithub />
          </a>
          <button
            className="border-zinc-300 px-3 dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex justify-center items-center"
            onClick={(e) => {
              toggleTheme();
              (e.target as HTMLElement).blur();
            }}
            aria-label={`Ubah tema halaman menjadi ${isDarkMode ? "cerah" : "gelap"
              }`}
          >
            {isDarkMode ? <BsFillMoonFill /> : <BsSun />}
          </button>
        </div>
      </div>
    </footer>
  );
};
