import styled, { createGlobalStyle } from "styled-components";
import BingoBody from "./BingoBody";
import BingoHeader from "./BingoHeader";

const Bingo = () => {
  return (
    <>
      <Global />
      <StyledTable>
        <BingoHeader />
        <BingoBody />
      </StyledTable>
    </>
  );
}

export default Bingo;

const Global = createGlobalStyle({
  body: {
    padding: '16px',
    margin: 0
  }
});

const StyledTable = styled.table({
  fontFamily: 'Courier New',
  textAlign: 'center'
});
