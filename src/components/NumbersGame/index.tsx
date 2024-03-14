import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ElapsedArea from "./ElapsedArea";
import EmptyButton from "./EmptyButton";
import NumberButton from "./NumberButton";
import NumbersArea from "./NumbersArea";
import StartButton from "./StartButton";
import NumberUtil from "./util/numberUtil";

const ONE_SIDE_LENGTH = 5;

const NumbersGame = () => {

  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [expectToBePushedNumber, setExpectToBePushedNumber] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  useEffect(() => {

    if (startTime === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 10);

    return (() => {
      clearInterval(intervalId)
    });

  }, [startTime]);

  const numberButtons = (() => {

    if (startTime === 0) {

      const emptyButtons: JSX.Element[] = [];

      for (let i = 0; i < ONE_SIDE_LENGTH ** 2; i++) {
        emptyButtons.push(<EmptyButton key={i} />);
      }

      return emptyButtons;
    }

    return randomNumbers.map((randomNumber) => {

      const clickNumber = () => {
        randomNumber === expectToBePushedNumber &&
        setExpectToBePushedNumber(prev => prev + 1);
      }

      return (
        <NumberButton
          number={randomNumber}
          expectToBePushedNumber={expectToBePushedNumber}
          onClick={clickNumber}
          key={randomNumber}
        />
      );
    });

  })();

  const clickStart = () => {
    setStartTime(Date.now());
    setExpectToBePushedNumber(0);
    setRandomNumbers(NumberUtil.randomRange(0, ONE_SIDE_LENGTH ** 2));
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <ElapsedArea elapsed={elapsed} />
        <NumbersArea numberButtons={numberButtons} />
        <StartButton onClick={clickStart} />
      </Container>
    </>
  );
}

export default NumbersGame;

const GlobalStyle = createGlobalStyle({
  body: {
    fontFamily: 'Courier New, monospace',
    backgroundColor: '#ccc'
  }
})

const Container = styled.main({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '280px',
  margin: '0 auto'
});
