import styled from "styled-components";
import ButtonArea from "../ButtonArea";
import ExtractedNumbersDisplay from "../ExtractedNumbersDisplay";
import { ButtonAreaState } from "../state/buttonAreaState";

type Props = {
  extractedNumbers: number[];
  buttonAreaState: ButtonAreaState;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const SideArea = ({
  extractedNumbers,
  buttonAreaState,
  onStart,
  onStop,
  onReset
}: Props) => {

  return (
    <Container>
      <ExtractedNumbersDisplay
        extractedNumbers={extractedNumbers}
      />
      <ButtonArea
        states={buttonAreaState}
        onStart={onStart}
        onStop={onStop}
        onReset={onReset}
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
