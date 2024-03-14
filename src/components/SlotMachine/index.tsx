import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import SpinContainer from "./SpinContainer";
import SpinButtonStates from "./SpinContainer/spinButtonStates";
import SpinImgIndices from "./SpinContainer/spinImgIndices";
import NumberUtil from "./util/numberUtil";

const IMG_SOURCES = [
  '../img/bell.png',
  '../img/cherry.png',
  '../img/seven.png'
] as const;

const SlotMachine = () => {

  const [spinImgIndices, setSpinImgIndices] = useState(
    SpinImgIndices.getRandom(IMG_SOURCES.length));
  const [spinButtonsStates, setSpinButtonsStates] = useState(
    SpinButtonStates.INITIAL);
  const [isSpinButtonDisabled, setIsSpinButtonDisabled] = useState(false);

  useEffect(() => {

    if (SpinButtonStates.isAllDisabled(spinButtonsStates)) {
      setIsSpinButtonDisabled(false);
    }

  }, [spinButtonsStates]);

  const stopLeft = () => {
    setSpinButtonsStates((prev) => ({ ...prev, leftDisabled: true}));
    setSpinImgIndices((prev) => ({ ...prev, left: NumberUtil.getRandInt(
      IMG_SOURCES.length)}));
  }

  const stopCenter = () => {
    setSpinButtonsStates((prev) => ({ ...prev, centerDisabled: true}));
    setSpinImgIndices((prev) => ({ ...prev, center: NumberUtil.getRandInt(
      IMG_SOURCES.length)}));
  }

  const stopRight = () => {
    setSpinButtonsStates((prev) => ({ ...prev, rightDisabled: true}));
    setSpinImgIndices((prev) => ({ ...prev, right: NumberUtil.getRandInt(
      IMG_SOURCES.length)}));
  }

  const doSpin = () => {
    setSpinButtonsStates(SpinButtonStates.ALL_ENABLED);
    setIsSpinButtonDisabled(true);
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <SpinContainer
          states={spinButtonsStates}
          imgSources={IMG_SOURCES}
          imgIndices={spinImgIndices}
          onClickLeft={stopLeft}
          onClickCenter={stopCenter}
          onClickRight={stopRight}
        />
        <SpinButton
          onClick={doSpin}
          disabled={isSpinButtonDisabled}
          $isDisabled={isSpinButtonDisabled}
        >
          SPIN
        </SpinButton>
      </Container>
    </>
  );
}

export default SlotMachine;

const GlobalStyle = createGlobalStyle({
  body: {
    backgroundColor: '#ccc',
  }
});

const Container = styled.main({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center'
});

const SpinButton = styled.button<{ $isDisabled: boolean }>`
  all: unset;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: #3388ff;
  box-shadow: 0 4px 0 #1166ff;
  opacity: ${props => props.$isDisabled ? '.5' : '1'};
  border-radius: 16px;
  width: 270px;
  height: 36px;
  line-height: 36px;
  &:hover {
    cursor: pointer;
  }
`;
