import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonArea from "./ButtonArea";
import ButtonStates from "./ButtonArea/buttonStates";
import Display from "./Display";
import TimeUtil from "./timeUtil";

const Stopwatch = () => {

  const [baseTime, setBaseTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isMove, setIsMove] = useState(false);
  const [buttonStates, setButtonStates] = useState(ButtonStates.INITIAL);

  useEffect(() => {

    if (!isMove) {
      return;
    }

    const intervalId = setInterval(() => {
      setElapsed(Date.now() - baseTime);
    }, 100);

    return () => {clearInterval(intervalId)};
  }, [isMove, baseTime]);

  const clickStart = () => {
    setBaseTime(Date.now() - elapsed);
    setIsMove(true);
    setButtonStates(ButtonStates.ONLY_STOP_ENABLED);
  }

  const clickStop = () => {
    setIsMove(false);
    setButtonStates(ButtonStates.ONLY_STOP_DISABLED);
  }

  const clickReset = () => {
    setBaseTime(0);
    setElapsed(0);
    setButtonStates(ButtonStates.INITIAL);
  }

  return (
    <StyledMain>
      <Display elapsed={TimeUtil.toString(elapsed)} />
      <ButtonArea
        states={buttonStates}
        onStart={clickStart}
        onStop={clickStop}
        onReset={clickReset}
      />
    </StyledMain>
  );
}

export default Stopwatch;

const StyledMain = styled.main({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: 'Courier New',
  backgroundColor: 'white',
  width: '272px',
  height: '184px',
  padding: '16px',
  margin: '0 auto'
});
