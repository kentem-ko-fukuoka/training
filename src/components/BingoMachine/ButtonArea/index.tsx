import styled from "styled-components";
import Button from "../Button";
import { ButtonAreaState } from "../state/buttonAreaState";

type Props = {
  states: ButtonAreaState;
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
        text='START'
        onClick={onStart}
        isDisabled={states.isStartDisabled}
      />
      <Button
        text='STOP'
        onClick={onStop}
        isDisabled={states.isStopDisabled}
      />
      <Button
        text='RESET'
        onClick={onReset}
        isDisabled={states.isResetDisabled}
      />
    </Container>
  );
}

export default ButtonArea;

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  width: '26dvw',
  borderRadius: '.5rem',
  boxSizing: 'border-box',
  boxShadow: '0 0 .5rem #999',
  padding: '1.5rem'
});
