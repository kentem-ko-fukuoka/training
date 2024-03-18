import { ChangeEventHandler, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import NumberDisplay from "./NumberDisplay";
import ResetDialog from "./ResetDialog";
import SideArea from "./SideArea";
import { BingoState } from "./state/bingoState";
import { ButtonAreaState } from "./state/buttonAreaState";
import { ResetDialogState } from "./state/resetDialogState";
import BingoUtil from "./util/bingoUtil";
import LocalStorageUtil from "./util/localStorageUtil";
import useSound from "use-sound";

export const DISPLAY_NUMBER_INITIAL = 0;

const BINGO_INITIAL: BingoState = {
  isMove: false,
  extractedNumbers: []
};

const BINGO_REFRESHED: BingoState = {
  isMove: false,
  extractedNumbers: BingoUtil.getExtractedNumbers()
} as const;

export const BUTTONS_INITIAL: ButtonAreaState = {
  isStartDisabled: false,
  isStopDisabled: true,
  isResetDisabled: false
} as const;

export const ONLY_STOP_ENABLED: ButtonAreaState = {
  isStartDisabled: true,
  isStopDisabled: false,
  isResetDisabled: true
} as const;

export const DIALOG_OPEN: ResetDialogState = {
  isOpen: true,
  password: '',
  isUnmatchPassword: false
} as const;

export const DIALOG_CLOSE: ResetDialogState = {
  isOpen: false,
  password: '',
  isUnmatchPassword: false
} as const;

const BingoMachine = () => {

  const [displayNumber, setDisplayNumber] = useState(DISPLAY_NUMBER_INITIAL);

  const [bingoState, setBingoState] = useState(BINGO_REFRESHED);
  const [buttonAreaState, setButtonAreaState] = useState(BUTTONS_INITIAL);
  const [resetDialogState, setResetDialogState] = useState(DIALOG_CLOSE);

  const [playDrumroll] = useSound('../sound/drumroll.mp3', {
    sprite: {
      begin: [0, 6000],
      end: [5890, 1000]
    },
    interrupt: true
  });

  useEffect(() => {

    if (!bingoState.isMove) {
      return;
    }

    const remainNumbers = BingoUtil.getRemainNumbers();

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * remainNumbers.length);
      setDisplayNumber(remainNumbers[randomIndex]);
    }, 30);

    return (() => {
      clearInterval(intervalId);
    });
  }, [bingoState.isMove]);

  const start = () => {
    playDrumroll({ id: 'begin' });
    setBingoState({ ...bingoState, isMove: true });
    setButtonAreaState(ONLY_STOP_ENABLED);
  }

  const stop = () => {
    playDrumroll({ id: 'end' });
    LocalStorageUtil.set(displayNumber);
    setBingoState(prev => ({
      ...prev,
      extractedNumbers: [...prev.extractedNumbers, displayNumber],
      isMove: false }));
    setButtonAreaState(BUTTONS_INITIAL);

    if (LocalStorageUtil.get().length !== BingoUtil.TARGET_NUMBERS.length) {
      return;
    }

    alert('すべての数字が出ました。\nRESETします。');
    reset();
  };

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setResetDialogState({
      ...resetDialogState,
      password: e.target.value,
      isUnmatchPassword: false
    });
  };

  const reset = () => {

    LocalStorageUtil.clear();

    setDisplayNumber(DISPLAY_NUMBER_INITIAL);
    setBingoState(BINGO_INITIAL);
    setButtonAreaState(BUTTONS_INITIAL);
    setResetDialogState(DIALOG_CLOSE);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <NumberDisplay
          displayNumber={displayNumber}
          extractedNumbers={bingoState.extractedNumbers}
        />
        <SideArea
          extractedNumbers={bingoState.extractedNumbers}
          buttonAreaState={buttonAreaState}
          startOnClick={start}
          stopOnClick={stop}
          resetOnClick={() => setResetDialogState(DIALOG_OPEN)}
        />
      </Container>
      <ResetDialog
        thisState={resetDialogState}
        setThisState={setResetDialogState}
        onChangePassword={handleChangePassword}
        onReset={reset}
        onClose={() => setResetDialogState(DIALOG_CLOSE)}
      />
    </>
  );
}

export default BingoMachine;

const GlobalStyle = createGlobalStyle({
  body: {
    fontFamily: 'system-ui',
    backgroundImage: 'url(../img/kentem.png)',
    backdropFilter: 'sepia(80%) brightness(90%)',
    width: '100%',
    height: '100dvh',
    margin: 0
  }
});

const Container = styled.main({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5dvw',
  height: '100dvh'
});
