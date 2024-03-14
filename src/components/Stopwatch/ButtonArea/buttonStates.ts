export type ButtonStates = {
  isStartDisabled: boolean;
  isStopDisabled: boolean;
  isResetDisabled: boolean;
}

namespace ButtonStates {

  export const INITIAL: ButtonStates = {
    isStartDisabled: false,
    isStopDisabled: true,
    isResetDisabled: true
  }

  export const ONLY_STOP_ENABLED: ButtonStates = {
    isStartDisabled: true,
    isStopDisabled: false,
    isResetDisabled: true
  }

  export const ONLY_STOP_DISABLED: ButtonStates = {
    isStartDisabled: false,
    isStopDisabled: true,
    isResetDisabled: false
  }
}

export default ButtonStates;
