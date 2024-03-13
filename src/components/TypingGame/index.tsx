import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const INITIAL_MESSAGE = 'Click to start!!';
const LETTERS_ARRAY = ['red', 'pink', 'blue'] as const;

const replaceUnderscore = (letters: string, index: number): string => {
  return `${letters.substring(0, index)}_${letters.substring(index + 1, letters.length)}`;
}

const formatTime = (time: number): string => {
  const sec = Math.floor(time / 1000);
  const msec = Math.round((time % 1000) / 10);
  return `${sec}.${msec}`;
}

const TypingGame = () => {

  const [beginTime, setBeginTime] = useState(0);
  const [displayLetters, setDisplayLetters] = useState(INITIAL_MESSAGE);
  const [lettersArray, setLettersArray] = useState([...LETTERS_ARRAY]);
  const [inputIndex, setInputIndex] = useState(0);
  const [finishText, setFinishText] = useState('');

  useEffect(() => {

    if (beginTime === 0) {
      return;
    }

    const handlePressKey = (e: KeyboardEvent) => {

      if (e.key !== displayLetters[inputIndex]) {
        return;
      }

      if (displayLetters.length === inputIndex + 1) {

        if (lettersArray.length === 0) {
          const elapsed = Date.now() - beginTime;
          setFinishText(`Finished! ${formatTime(elapsed)}seconds!`);
          setDisplayLetters((prev) => replaceUnderscore(prev, inputIndex));
          return;
        }

        const extractIndex = Math.floor(Math.random() * lettersArray.length);
        const newDisplayLetters = lettersArray[extractIndex];

        setLettersArray((prev) => (prev.filter((_, index) => index !== extractIndex)));
        setDisplayLetters(newDisplayLetters);
        setInputIndex(0);
        return;
      }

      setDisplayLetters((prev) => replaceUnderscore(prev, inputIndex));
      setInputIndex((prev) => prev + 1);
    }

    document.addEventListener('keydown', handlePressKey, false);

    return () => {document.removeEventListener('keydown', handlePressKey);}

  }, [beginTime, displayLetters, inputIndex, finishText]);

  const onStart = () => {

    if (beginTime > 0) {
      return;
    }

    const extractIndex = Math.floor(Math.random() * lettersArray.length);
    const newDisplayLetters = lettersArray[extractIndex];

    setBeginTime(Date.now());
    setLettersArray((prev) => (prev.filter((_, index) => index !== extractIndex)));
    setDisplayLetters(newDisplayLetters);
  }

  return (
    <>
      <GlobalStyle />
      <Container onClick={onStart}>
        <StyledDiv>
          <Letters>{displayLetters}</Letters>
          <span>{finishText}</span>
        </StyledDiv>
      </Container>
    </>
  );
}

export default TypingGame;

const GlobalStyle = createGlobalStyle({
  body: {
    backgroundColor: '#fafafa',
    width: '100%',
    height: '100dvh'
  },
  '&#root': {
    width: '100%',
    height: '100%'
  }
});

const Container = styled.main({
  width: '100%',
  height: 'calc(100% - 87px)',
  paddingTop: '64px'
});

const StyledDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  fontFamily: 'Courier New',
  textAlign: 'center',
  margin: '0 auto',
  width: '100%'
})

const Letters = styled.span({
  fontSize: '48px',
  letterSpacing: '6px'
});
