import NumberUtil from "../util/numberUtil";

export type SpinImgIndices = {
  left: number;
  center: number;
  right: number;
}

namespace SpinImgIndices {

  export const getRandom = (length: number): SpinImgIndices => {
    return {
      left: NumberUtil.getRandInt(length),
      center: NumberUtil.getRandInt(length),
      right: NumberUtil.getRandInt(length),
    };
  }
}

export default SpinImgIndices;
