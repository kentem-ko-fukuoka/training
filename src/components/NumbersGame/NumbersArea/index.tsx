import styled from "styled-components";
import NumberUtil from "../util/numberUtil";

type Props = {
  oneSideLength: number;
  nextNumber: number;
}

const NumbersArea = ({ oneSideLength, nextNumber }: Props) => {

  const buttons = NumberUtil.range(0, oneSideLength ** 2).map((n) => {
    return (
      <NumberButton
        disabled={n < nextNumber}
        key={n}
      >
        {n}
      </NumberButton>);
  });

  return (
    <Container onSideLength={oneSideLength}>
      {buttons}
    </Container>
  );
}

export default NumbersArea;

const Container = styled.div<{ onSideLength: number }>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: ${props => (40 * props.onSideLength + 16 * (props.onSideLength + 1))}px;
`;

const NumberButton = styled.button({
  color: 'white',
  backgroundColor: '#3388ff',
  width: '40px',
  height: '40px',
  border: 'none',
  borderRadius: '4px',
  boxShadow: '0 4px #0000ff',
  margin: '8px',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:disabled': {
    position: 'relative',
    top: '4px',
    backgroundColor: '#ccc',
    boxShadow: 'none'}
});
