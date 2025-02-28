export const isSameDay = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const getStartOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getEndOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const getLastDayOfPrevMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 0).getDate();

export const getStartOfYearRange = (year) => Math.floor(year / 10) * 10;

export const isYearInRange = (year, rangeStart, rangeEnd) => year >= rangeStart && year <= rangeEnd;

export const getAdjacentMonth = (date, offset) => 
  new Date(date.getFullYear(), date.getMonth() + offset, 1).toISOString();

export const getAdjacentYear = (date, offset) => 
  new Date(date.getFullYear() + offset, 0, 1).toISOString();

