import { useEffect, useState } from "react";

import { DateTime } from "luxon";

import type { ITimeAllocation, IScheduleStudent } from "@utils/schedule";

type Props = {
  Timezone: string;
  schedule: IScheduleStudent;
  allSchedulesLength: number;
  alloc: ITimeAllocation["alloc"];
};

export const DynamicDate = ({
  Timezone,
  alloc,
  allSchedulesLength,
  schedule,
}: Props) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const setTime = async () => {
      const currentDayTimeAllocation = alloc;

      const lastIndexTime = currentDayTimeAllocation[
        currentDayTimeAllocation.length - 1
      ]!.WAKTU![1].replace(".", ":");

      // const currentNext

      const isNextWeek =
        DateTime.now()
          .setZone(Timezone)
          .startOf("week")
          .plus({ days: allSchedulesLength - 1 })
          .set({
            hour: parseInt(lastIndexTime.split(":")[0]),
            minute: parseInt(lastIndexTime.split(":")[1]),
          }) <= DateTime.now().setZone(Timezone);

      const time = DateTime.now()
        .setZone(Timezone)
        .plus({ weeks: isNextWeek ? 1 : 0 })
        .startOf("week")
        .plus({
          days: schedule.day > 1 && schedule.day <= 7 ? schedule.day - 1 : 0,
        })
        .setLocale("id-ID");

      setDate(time.toLocaleString(DateTime.DATE_FULL));

      if (isNextWeek) {
        const nextWeekMondayTime = DateTime.now()
          .setZone(Timezone)
          .plus({ weeks: 1 })
          .startOf("week");

        if (time <= nextWeekMondayTime) {
          const targetCard = document.querySelector('[data-day="1"]');

          targetCard?.scrollIntoView({
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
        const targetCard = document.querySelector(
          `[data-day="${schedule.day}"]`
        );

        targetCard?.scrollIntoView({
          behavior: "smooth",
        });
      } else if (isEndOfDay) {
        const currentTime = DateTime.now().setZone(Timezone);

        const nextTargetCard = document.querySelector(
          `[data-day="${currentTime.weekday + 1}"]`
        );

        nextTargetCard?.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    setTime();
  }, []);

  return <>, {date}</>;
};
