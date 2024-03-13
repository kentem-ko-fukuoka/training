import styled from "styled-components";
import SpinControl from "../SpinControl";
import { SpinButtonStates } from "./spinButtonStates";
import { SpinImgIndices } from "./spinImgIndices";

type Props = {
  states: SpinButtonStates;
  imgSources: readonly string[];
  imgIndices: SpinImgIndices;
  onClickLeft: () => void;
  onClickCenter: () => void;
  onClickRight: () => void;
}

const SpinContainer = ({
  states,
  imgSources,
  imgIndices,
  onClickLeft,
  onClickCenter,
  onClickRight
}: Props) => {

  return (
    <Container>
      <SpinControl
        imgSources={imgSources}
        imgIndex={imgIndices.left}
        isDisabled={states.leftDisabled}
        delay={30}
        onClick={onClickLeft}
      />
      <SpinControl
        imgSources={imgSources}
        imgIndex={imgIndices.center}
        isDisabled={states.centerDisabled}
        delay={50}
        onClick={onClickCenter}
      />
      <SpinControl
        imgSources={imgSources}
        imgIndex={imgIndices.right}
        isDisabled={states.rightDisabled}
        delay={10}
        onClick={onClickRight}
      />
    </Container>
  );
}

export default SpinContainer;

const Container = styled.div({
  display: 'inline-flex',
  gap: '16px',
  backgroundColor: '#eee',
  border: '4px solid white',
  borderRadius: '12px',
  width: '350px',
  boxSizing: 'border-box',
  padding: '20px'
});
