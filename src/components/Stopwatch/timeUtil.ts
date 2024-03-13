namespace TimeUtil {

  const MINUTES_PER_HOUR = 60;

  const SECONDS_PER_MINUTE = 60;

  const MILLISECONDS_PER_SECOND = 1000;
  const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;

  const format = (time: number, digits: number): string => {
    return time.toString().padStart(digits, '0');
  }

  export const toString = (milliseconds: number): string => {
    const mm = format(Math.floor(milliseconds / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR, 2);
    const ss = format(Math.floor(milliseconds / MILLISECONDS_PER_SECOND) % SECONDS_PER_MINUTE, 2);
    const SSS = format(milliseconds % MILLISECONDS_PER_SECOND, 3);
    return `${mm}:${ss}.${SSS}`;
  }
}

export default TimeUtil;
