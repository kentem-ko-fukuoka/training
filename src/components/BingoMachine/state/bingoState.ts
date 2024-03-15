import BingoUtil from "../util/bingoUtil";

type BingoState = {
  isMove: boolean;
  extractedNumbers: number[];
}

namespace BingoState {

  export const INITIAL: BingoState = {
    isMove: false,
    extractedNumbers: []
  };

  export const REFRESHED: BingoState = {
    isMove: false,
    extractedNumbers: BingoUtil.getExtractedNumbers()
  };
}

export default BingoState;
