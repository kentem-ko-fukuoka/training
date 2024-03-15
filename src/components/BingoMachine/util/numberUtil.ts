namespace NumberUtil {

  export const range = (begin: number, end: number): number[] => {

    const array: number[] = [];

    for (let i = begin; i < end; i++) {
      array.push(i);
    }

    return array;
  }
}

export default NumberUtil;
