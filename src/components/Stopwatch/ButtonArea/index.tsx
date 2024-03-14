import styled from "styled-components";
import Button from "../Button";
import { ButtonStates } from "./buttonStates";

type Props = {
  states: ButtonStates;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const ButtonArea = ({
  states,
  onStart,
  onStop,
  onReset
}: Props) => {

  return (
    <Container>
      <Button
        text='Start'
        onClick={onStart}
        isDisabled={states.isStartDisabled}
      />
      <Button
        text='Stop'
        onClick={onStop}
        isDisabled={states.isStopDisabled}
      />
      <Button
        text='Reset'
        onClick={onReset}
        isDisabled={states.isResetDisabled}
      />
    </Container>
  );
}

export default ButtonArea;

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
});
