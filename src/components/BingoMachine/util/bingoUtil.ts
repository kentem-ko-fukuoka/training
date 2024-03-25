import LocalStorageUtil from "./localStorageUtil";
import NumberUtil from "./numberUtil";

namespace BingoUtil {

  export const TARGET_NUMBERS: readonly number[] = NumberUtil.range(1, 100);

  export const getExtractedNumbers = (): number[] => {
    return LocalStorageUtil.get();
  }

  export const getRemainNumbers = (): number[] => {
    return TARGET_NUMBERS.filter((number) => {
      return !getExtractedNumbers().includes(number);
    });
  }
}

export default BingoUtil;
