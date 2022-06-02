import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

class DayjsDateProvider implements IDateProvider {
  constructor() {
    dayjs.extend(utc);
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(start_date_utc).diff(end_date_utc, "days");
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(start_date_utc).diff(end_date_utc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
