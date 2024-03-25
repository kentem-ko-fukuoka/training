import styled, { keyframes } from "styled-components";
import { DISPLAY_NUMBER_INITIAL } from "../../BingoMachine";

type Props = {
  displayNumber: number;
  extractedNumbers: number[];
}

const NumberDisplay = ({
  displayNumber,
  extractedNumbers
}: Props) => {

  const content = (() => {

    if (displayNumber !== DISPLAY_NUMBER_INITIAL) {
      return displayNumber;
    }

    if (extractedNumbers.length !== 0) {
      return extractedNumbers[extractedNumbers.length - 1];
    }

    return <StartMessage>Push START</StartMessage>
  })();

  return (
    <StyledSpan>
      {content}
    </StyledSpan>
  );
}

export default NumberDisplay;

const StyledSpan = styled.span({
  backgroundColor: '#fff',
  fontSize: '35dvw',
  textAlign: 'center',
  boxSizing: 'border-box',
  boxShadow: '0 0 8px #999',
  width: '44dvw',
  height: '44dvw',
  lineHeight: '43dvw',
  borderRadius: '8px'
});

const flashing = keyframes({
  from: {
    opacity: '0'
  },
  to: {
    opacity: '1'
  }
});

const StartMessage = styled.span`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 96px;
  font-weight: bold;
  color: #fecc00;
  width: 100%;
  height: 100%;
  animation: ${flashing} 1000ms infinite ease-in-out;
`;
