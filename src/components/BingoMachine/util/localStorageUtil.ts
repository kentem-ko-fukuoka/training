namespace LocalStorageUtil {

  const KEY_EXTRACTED_NUMBERS = 'extracted-numbers';

  export const get = (): number[] => {

    const item = localStorage.getItem(KEY_EXTRACTED_NUMBERS);

    if (item === null) {
      return [];
    }

    return JSON.parse(item) as number[];
  }

  export const set = (extractNumber: number): void => {
    const extractedNumbers = get();
    localStorage.setItem(KEY_EXTRACTED_NUMBERS,
      JSON.stringify([...extractedNumbers, extractNumber]));
  }

  export const clear = (): void => {
    localStorage.removeItem(KEY_EXTRACTED_NUMBERS);
  }
}

export default LocalStorageUtil;
