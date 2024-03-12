import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import NumbersArea from "./NumbersArea";

const ONE_SIDE_LENGTH = 5;

const NumbersGame = () => {

  const [nextNumber, setNextNumber] = useState(0);

  const clickCorrectNumber = () => {
    setNextNumber((prev) => prev + 1);
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <NumbersArea oneSideLength={ONE_SIDE_LENGTH} nextNumber={nextNumber} />
      </Container>
    </>
  );
}

export default NumbersGame;

const GlobalStyle = createGlobalStyle({
  body: {
    backgroundColor: '#ccc'
  }
})

const Container = styled.main({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
});
