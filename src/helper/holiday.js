// src/helpers/holidays.js

import dayjs from "dayjs";

// Year-agnostic holidays in MM-DD format
const holidays = [
  "01-01", // New Year's Day
  "02-10", // Chinese New Year
  "02-25", // EDSA People Power Revolution Anniversary
  "04-09", // Araw ng Kagitingan
  "05-01", // Labor Day
  "06-12", // Independence Day
  "08-21", // Ninoy Aquino Day
  "11-01", // All Saints' Day
  "11-02", // All Souls' Day
  "11-30", // Bonifacio Day
  "12-24", // Christmas Eve
  "12-25", // Christmas Day
  "12-30", // Rizal Day
  "12-31"  // New Year's Eve
];

/**
 * Checks if a given date falls on a holiday or is in the past.
 * @param {dayjs.Dayjs} date - The date to check.
 * @returns {boolean} - True if the date is in the past or a holiday.
 */
export const isDateUnavailable = (date) => {
  const isTodayOrFuture = dayjs(date).isSame(dayjs(), "day") || dayjs(date).isAfter(dayjs(), "day");
  const formattedDate = dayjs(date).format("MM-DD");
  const isHoliday = holidays.includes(formattedDate);

  return !isTodayOrFuture || isHoliday;
};

export default holidays;
