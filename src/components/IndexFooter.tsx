import { useState, useEffect } from "react";

import { BsGithub, BsFillMoonFill, BsSun } from "react-icons/bs";

export const IndexFooter = () => {
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
    <footer className="fixed inset-x-0 bottom-0 border-t dark:shadow dark:shadow-white dark:border-sm dark:border-neutral-950 border-solid w-full backdrop-blur-sm">
      <div className="flex flex-wrap h-full items-center justify-center">
        <div className="flex text-xl gap-5 p-3">
          <a
            href="https://github.com/reacto11mecha/jadwal-ssg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Halaman repositori github kode website ini"
            className="py-2 px-3 text-lg dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex justify-center items-center"
          >
            <BsGithub />
          </a>
          <button
            className="py-2 px-3 text-lg dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex justify-center items-center"
            onClick={(e) => {
              toggleTheme();
              (e.target as HTMLElement).blur();
            }}
            aria-label={`Ubah tema halaman menjadi ${
              isDarkMode ? "cerah" : "gelap"
            }`}
          >
            {isDarkMode ? <BsFillMoonFill /> : <BsSun />}
          </button>
        </div>
      </div>
    </footer>
  );
};
