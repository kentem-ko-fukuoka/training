import styled from "styled-components";
import ButtonArea from "../ButtonArea";
import ExtractedNumbersDisplay from "../ExtractedNumbersDisplay";
import { ButtonAreaState } from "../state/buttonAreaState";

type Props = {
  extractedNumbers: number[];
  buttonAreaState: ButtonAreaState;
  startOnClick: () => void;
  stopOnClick: () => void;
  resetOnClick: () => void;
}

const SideArea = ({
  extractedNumbers,
  buttonAreaState,
  startOnClick,
  stopOnClick,
  resetOnClick
}: Props) => {

  return (
    <Container>
      <ExtractedNumbersDisplay
        extractedNumbers={extractedNumbers}
      />
      <ButtonArea
        states={buttonAreaState}
        onStart={startOnClick}
        onStop={stopOnClick}
        onReset={resetOnClick}
      />
    </Container>
  );
}

export default SideArea;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '6dvh',
  height: '44dvw'
});
