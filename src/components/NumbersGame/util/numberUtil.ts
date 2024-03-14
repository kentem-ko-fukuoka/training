namespace NumberUtil {

  export const format = (msec: number): string => {

    const m = (Math.floor(msec / 1000 / 60) % 60).toString().padStart(2, '0');
    const s = (Math.floor(msec / 1000) % 60).toString().padStart(2, '0');
    const ms = (Math.floor(msec % 1000 / 10)).toString().padStart(2, '0');

    return `${m}:${s}.${ms}`;
  }

  export const range = (begin: number, end: number): number[] => {

    const array: number[] = [];

    for (let i = begin; i < end; i++) {
      array.push(i);
    }

    return array;
  }

  const extractRandom = (numbers: number[]): number => {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers.splice(randomIndex, 1)[0];
  }

  export const randomRange = (begin: number, end: number): number[] => {

    const array = range(begin, end);

    const randomArray: number[] = [];

    while (array.length > 0) {
      randomArray.push(extractRandom(array));
    }

    return randomArray;
  }
}

export default NumberUtil;
