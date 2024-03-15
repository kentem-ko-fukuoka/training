export type ButtonAreaState = {
  isStartDisabled: boolean;
  isStopDisabled: boolean;
  isResetDisabled: boolean;
}

namespace ButtonAreaState {

  export const INITIAL: ButtonAreaState = {
    isStartDisabled: false,
    isStopDisabled: true,
    isResetDisabled: false
  }

  export const ONLY_STOP_ENABLED: ButtonAreaState = {
    isStartDisabled: true,
    isStopDisabled: false,
    isResetDisabled: true
  }

  export const ONLY_STOP_DISABLED = INITIAL;
}

export default ButtonAreaState;

