import { useState, useEffect } from "react";
import { getDay } from "@/utils/getDay";

import styles from "@/styles/ClassSSG.module.css";
import type { ISchedule, ITimeInfo } from "@/types/jadwal";

export function ScheduleCard({
  perDay,
  waktu,
}: {
  perDay: ISchedule;
  waktu: ITimeInfo;
}) {
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    const setTime = async () => {
      const DateTime = (await import("luxon")).DateTime;

      const time = DateTime.now()
        .setZone(waktu.TZ)
        .startOf("week")
        .plus({
          days: perDay.day > 1 && perDay.day <= 7 ? perDay.day - 1 : 0,
        })
        .setLocale("id-ID")
        .toLocaleString(DateTime.DATE_FULL);

      setTanggal(time);
    };

    setTime();
  }, []);

  return (
    <div>
      <article className="card">
        <footer>
          <div>
            <h3>
              {getDay(perDay.day)}
              {tanggal.length > 1 ? `, ${tanggal}` : ""}
            </h3>

            <table className={`primary ${styles.table}`}>
              <thead>
                <tr>
                  <th>Jam ke-</th>
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
