type ResetDialogState = {
  isOpen: boolean;
  password: string;
  isUnmatchPassword: boolean;
}

namespace ResetDialogState {

  export const INITIAL: ResetDialogState = {
    isOpen: false,
    password: '',
    isUnmatchPassword: false
  } as const;

  export const OPEN: ResetDialogState = {
    isOpen: true,
    password: '',
    isUnmatchPassword: false
  } as const;

  export const CLOSE: ResetDialogState = INITIAL;
}

export default ResetDialogState;
