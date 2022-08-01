import { useState, useEffect, useRef } from "react";
import { getDay } from "@/utils/getDay";

import styles from "@/styles/ClassSSG.module.css";
import type { ISchedule, IIndividualClass, ITimeInfo } from "@/types/jadwal";

export function ScheduleCard({
  perDay,
  jadwal,
  waktu,
}: {
  perDay: ISchedule;
  jadwal: IIndividualClass;
  waktu: ITimeInfo;
}) {
  const [tanggal, setTanggal] = useState("");
  const cardRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const setTime = async () => {
      const DateTime = (await import("luxon")).DateTime;

      const isNextWeek =
        DateTime.now()
          .setZone(waktu.TZ)
          .startOf("week")
          .plus({ days: jadwal.schedule.length })
          .startOf("day")
          .toMillis() <= DateTime.now().setZone(waktu.TZ).toMillis();

      const time = DateTime.now()
        .setZone(waktu.TZ)
        .plus({ weeks: isNextWeek ? 1 : 0 })
        .startOf("week")
        .plus({
          days: perDay.day > 1 && perDay.day <= 7 ? perDay.day - 1 : 0,
        })
        .setLocale("id-ID");

      setTanggal(time.toLocaleString(DateTime.DATE_FULL));

      if (isNextWeek) {
        const nextWeekMondayTime = DateTime.now()
          .setZone(waktu.TZ)
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
        time.startOf("day") <= DateTime.now().setZone(waktu.TZ);
      const currentDayTimeAllocation = waktu.TimeAllocation.find(
        ({ currentDay }) => currentDay === perDay.day
      )!.alloc;

      const lastIndexTime = currentDayTimeAllocation[
        currentDayTimeAllocation.length - 1
      ]!.WAKTU![1].replace(".", ":");
      const endOfDayTime = time.set({
        hour: parseInt(lastIndexTime.split(":")[0]),
        minute: parseInt(lastIndexTime.split(":")[1]),
      });

      const isEndOfDay = endOfDayTime <= DateTime.now().setZone(waktu.TZ);

      if (isTheSameDay && !isEndOfDay) {
        cardRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (isEndOfDay) {
        const nextDayCard = cardRef.current.parentNode?.nextSibling?.firstChild;

        if (nextDayCard) {
          nextDayCard.scrollIntoView({
            behaviour: "smooth",
          });
        }
      }
    };

    setTime();

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
                {perDay.lessons.map((lesson, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{lesson}</td>
                    <td>
                      {waktu.TimeAllocation.find(
                        (time) => time.currentDay === perDay.day
                      )!
                        .alloc.find((allocation) => allocation.JAM === idx + 1)!
                        .WAKTU.join(" - ")}
                    </td>
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
