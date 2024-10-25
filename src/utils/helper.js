import moment from "moment";

export function getDayFromDate(dateString) {
  const date = new Date(dateString);

  // Array of weekday names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

export function toIsoDateString(dateString) {
  return moment.utc(dateString).add(1, "days").format("YYYY-MM-DD");
}

export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number); 
  return hours * 60 + minutes; 
};
