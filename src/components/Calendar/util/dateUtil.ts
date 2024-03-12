namespace DateUtil {

  export const FIRST_DATE_OF_MONTH = 1;
  export const DAY_COUNT_PER_WEEK = 7;

  export const getFirstDay = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  export const getLastDay = (date: Date): number => {
    const thisMonthLastDayDate = getLastDayDate(date);
    return thisMonthLastDayDate.getDay();
  }

  export const getPrevMonthLastDate = (date: Date): number => {
    const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    return prevMonthLastDate.getDate();
  }

  export const getLastDate = (date: Date): number => {
    const thisMonthLastDayDate = getLastDayDate(date);
    return thisMonthLastDayDate.getDate();
  }

  const getLastDayDate = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
}

export default DateUtil;
