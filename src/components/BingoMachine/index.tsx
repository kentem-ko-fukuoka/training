import { ChangeEventHandler, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import NumberDisplay from "./NumberDisplay";
import ResetDialog from "./ResetDialog";
import SideArea from "./SideArea";
import BingoState from "./state/bingoState";
import ButtonAreaState from "./state/buttonAreaState";
import ResetDialogState from "./state/resetDialogState";
import BingoUtil from "./util/bingoUtil";
import LocalStorageUtil from "./util/localStorageUtil";

export const DISPLAY_NUMBER_INITIAL = 0;

const BingoMachine = () => {

  const [displayNumber, setDisplayNumber] = useState(DISPLAY_NUMBER_INITIAL);

  const [bingoState, setBingoState] = useState(BingoState.REFRESHED);
  const [buttonAreaState, setButtonAreaState] = useState(ButtonAreaState.INITIAL);
  const [resetDialogState, setResetDialogState] = useState(ResetDialogState.INITIAL);

  useEffect(() => {

    if (bingoState.extractedNumbers.length !== 99) {
      return;
    }

    alert('すべての数字が出ました。\nRESETします。');
    reset();
  }, [bingoState.extractedNumbers]);

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
    setBingoState({ ...bingoState, isMove: true });
    setButtonAreaState(ButtonAreaState.ONLY_STOP_ENABLED);
  }

  const stop = () => {
    LocalStorageUtil.set(displayNumber);
    setBingoState({ extractedNumbers: LocalStorageUtil.get(), isMove: false });
    setButtonAreaState(ButtonAreaState.ONLY_STOP_DISABLED);
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
    setBingoState(BingoState.INITIAL);
    setButtonAreaState(ButtonAreaState.INITIAL);
    setResetDialogState(ResetDialogState.CLOSE);
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
          onStart={start}
          onStop={stop}
          onReset={() => setResetDialogState(ResetDialogState.OPEN)}
        />
      </Container>
      <ResetDialog
        thisState={resetDialogState}
        setThisState={setResetDialogState}
        onChangePassword={handleChangePassword}
        onReset={reset}
        onClose={() => setResetDialogState(ResetDialogState.CLOSE)}
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
