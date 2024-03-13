import styled from "styled-components";
import NumberUtil from "../util/numberUtil";

type Props = {
  elapsed: number;
}

const ElapsedArea = ({ elapsed }: Props) => {
  return (
    <ElapsedSpan>{NumberUtil.format(elapsed)}</ElapsedSpan>
  );
}

export default ElapsedArea;

const ElapsedSpan = styled.span({
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'right',
  color: 'white',
});
