export const isTimeEnableForEvent = (
  eventDate: Date,
  eventDuration: number,
  potentialEventStart: string,
  lastEnableEventEnd: string
): boolean => {
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const day = eventDate.getDate();
  const startHour = +potentialEventStart.split(':')[0];
  const startMinutes = +potentialEventStart.split(':')[1];
  const endHour = +lastEnableEventEnd.split(':')[0];
  const endMinutes = +lastEnableEventEnd.split(':')[1];

  const startDateTime = new Date(
    year,
    month,
    day,
    startHour,
    startMinutes
  ).getTime();
  const endDateTime = new Date(
    year,
    month,
    day,
    endHour,
    endMinutes + 1
  ).getTime();

  return eventDuration < endDateTime - startDateTime;
};
