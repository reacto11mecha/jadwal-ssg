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
    };

    setTime();
  }, []);

  return <>, {date}</>;
};
