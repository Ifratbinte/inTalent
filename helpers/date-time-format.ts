import moment from "moment";

export const dateFormat = (date: string | Date) =>
  date
    ? moment(typeof date === "string" ? new Date(date) : date).format(
        process.env.NEXT_PUBLIC_DATE_FORMAT ?? "DD MMM, yyyy"
      )
    : "";
