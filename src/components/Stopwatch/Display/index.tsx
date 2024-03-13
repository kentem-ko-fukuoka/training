import styled from "styled-components";

type Props = {
  elapsed: string;
}

const Display = ({ elapsed }: Props) => {
  return (
    <StyledSpan>{elapsed}</StyledSpan>
  );
}

export default Display;

const StyledSpan = styled.span({
  display: 'block',
  fontSize: '40px',
  backgroundColor: '#ddd',
  textAlign: 'center',
  width: '272px',
  height: '120px',
  lineHeight: '120px'
});
