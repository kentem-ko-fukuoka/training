import styled from "styled-components";
import BingoUtil from "../util/bingoUtil";

type Props = {
  extractedNumbers: number[];
}

const ExtractedNumbersDisplay = ({ extractedNumbers }: Props) => {
  return (
    <Container>
      {
        BingoUtil.TARGET_NUMBERS.map((number) => {
          return (
            <Number
              $isExtracted={extractedNumbers.includes(number)}
              key={number}
            >
              {number}
            </Number>
          );
        })
      }
    </Container>
  );
}

export default ExtractedNumbersDisplay;


const Container = styled.div({
  display: 'grid',
  gridTemplate: 'repeat(10, auto) / repeat(10, auto)',
  gap: 'calc((26dvw - 2rem - 10 * 2rem) / 9)',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  boxShadow: '0 0 .5rem #999',
  borderRadius: '.5rem',
  padding: '1rem'
});

const Number = styled.span<{ $isExtracted: boolean }>`
  font-size: 1.5rem;
  font-weight: ${props => props.$isExtracted ? 'bold' : 'normal'};
  text-align: center;
  color: ${props => props.$isExtracted ? 'black' : 'lightgray'};
  border-radius: .25rem;
  box-sizing: border-box;
`;
