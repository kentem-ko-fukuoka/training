import styled from "styled-components";

const HEADER_LETTERS = ['B', 'I', 'N', 'G', 'O'];

const BingoHeader = () => {

  const ths = HEADER_LETTERS.map((letter, index) => {
    return (<StyledTh key={index}>{letter}</StyledTh>);
  });

  return (
    <thead>
      <tr>
        {ths}
      </tr>
    </thead>
  );
}

export default BingoHeader;

const StyledTh = styled.th({
  backgroundColor: 'pink',
  width: '40px',
  height: '40px'
});
