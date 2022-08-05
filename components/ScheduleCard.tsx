import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getDay } from "@/utils/getDay";

import styles from "@/styles/ClassSSG.module.css";
import type {
  ISchedule,
  IIndividualClass,
  ITimeAllocation,
} from "@/types/jadwal";

export function ScheduleCard({
  perDay,
  jadwal,
  waktu,
  Timezone,
}: {
  perDay: ISchedule;
  jadwal: IIndividualClass;
  waktu: ITimeAllocation;
  Timezone: string;
}) {
  const router = useRouter();

  const [tanggal, setTanggal] = useState("");
  const cardRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const setTime = async () => {
      const DateTime = (await import("luxon")).DateTime;

      const currentDayTimeAllocation = waktu.alloc;

      const lastIndexTime = currentDayTimeAllocation[
        currentDayTimeAllocation.length - 1
      ]!.WAKTU![1].replace(".", ":");

      const isNextWeek =
        DateTime.now()
          .setZone(Timezone)
          .startOf("week")
          .plus({ days: jadwal.schedule.length - 1 })
          .set({
            hour: parseInt(lastIndexTime.split(":")[0]),
            minute: parseInt(lastIndexTime.split(":")[1]),
          }) <= DateTime.now().setZone(Timezone);

      const time = DateTime.now()
        .setZone(Timezone)
        .plus({ weeks: isNextWeek ? 1 : 0 })
        .startOf("week")
        .plus({
          days: perDay.day > 1 && perDay.day <= 7 ? perDay.day - 1 : 0,
        })
        .setLocale("id-ID");

      setTanggal(time.toLocaleString(DateTime.DATE_FULL));

      if (isNextWeek) {
        const nextWeekMondayTime = DateTime.now()
          .setZone(Timezone)
          .plus({ weeks: 1 })
          .startOf("week");

        if (time <= nextWeekMondayTime) {
          cardRef.current.scrollIntoView({
            behavior: "smooth",
          });
        }

        return;
      }

      const isTheSameDay =
        time.startOf("day") <= DateTime.now().setZone(Timezone);

      const endOfDayTime = time.set({
        hour: parseInt(lastIndexTime.split(":")[0]),
        minute: parseInt(lastIndexTime.split(":")[1]),
      });

      const isEndOfDay = endOfDayTime <= DateTime.now().setZone(Timezone);

      if (isTheSameDay && !isEndOfDay) {
        cardRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (isEndOfDay) {
        const nextDayCard = cardRef.current.parentNode?.nextSibling?.firstChild;

        if (nextDayCard) {
          (nextDayCard as HTMLElement).scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    };

    setTime();

    router.events.on("routeChangeComplete", setTime);

    return () => {
      router.events.off("routeChangeComplete", setTime);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <article className={`card ${styles.card}`} ref={cardRef}>
        <footer>
          <div>
            <h3>
              {getDay(perDay.day)}
              {tanggal.length > 1 ? `, ${tanggal}` : ""}
            </h3>

            <table className={`primary ${styles.table}`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mapel</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {waktu.alloc.map((allocation, idx) => (
                  <tr key={idx}>
                    {!allocation.isBreak ? (
                      <>
                        <td>{allocation.JAM}</td>
                        <td>{perDay.lessons[allocation.JAM! - 1] ?? ""}</td>
                      </>
                    ) : (
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        ISTIRAHAT
                      </td>
                    )}
                    <td>{allocation.WAKTU.join(" - ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </footer>
      </article>
    </div>
  );
}
