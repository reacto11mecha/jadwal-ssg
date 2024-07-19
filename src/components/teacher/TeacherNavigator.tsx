import { useState, useEffect } from "react";

import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  currentTeacher: number;
  teacherList: {
    teacherName: string;
    teacherId: number;
  }[];
};

export const TeacherNavigator = ({ currentTeacher, teacherList }: Props) => {
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
        <div className="flex text-xl justify-center gap-5 p-3">
          <select
            className="min-h-[2em] w-[55%] dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md"
            value={currentTeacher}
            onChange={(e) => {
              document.location = `/teacher/${e.target.value}`;
            }}
          >
            {teacherList.map((teacher) => (
              <option key={teacher.teacherId} value={teacher.teacherId}>
                {teacher.teacherName}
              </option>
            ))}
          </select>
          <a
            className="px-3 dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex items-center"
            href="/teacher"
            onClick={() => {
              localStorage.removeItem("favorite-teacher");
            }}
          >
            <IoMdArrowRoundBack />
          </a>
          <button
            className="px-3 dark:bg-zinc-900 dark:border-sm dark:border-zinc-900 bg-gray-50 border rounded-md flex justify-center items-center"
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
