export type SpinButtonStates = {
  leftDisabled: boolean;
  centerDisabled: boolean;
  rightDisabled: boolean;
}

namespace SpinButtonStates {

  export const INITIAL: SpinButtonStates = {
    leftDisabled: true,
    centerDisabled: true,
    rightDisabled: true
  }

  export const ALL_ENABLED: SpinButtonStates = {
    leftDisabled: false,
    centerDisabled: false,
    rightDisabled: false
  }

  export const isAllDisabled = (states: SpinButtonStates): boolean => {
    return (
      states.leftDisabled &&
      states.centerDisabled &&
      states.rightDisabled
    );
  }
}

export default SpinButtonStates;
