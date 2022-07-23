export const getDay = (day: number) => {
  switch (day) {
    case 1:
      return "SENIN";
    case 2:
      return "SELASA";
    case 3:
      return "RABU";
    case 4:
      return "KAMIS";
    case 5:
      return "JUM'AT";
      break;
    case 7:
      return "SABTU";
    case 8:
      return "MINGGU";

    default:
      return "N/A";
  }
};
