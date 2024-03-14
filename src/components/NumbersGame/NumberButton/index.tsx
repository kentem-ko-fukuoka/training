import styled from "styled-components";

type Props = {
  number: number;
  expectToBePushedNumber: number;
  onClick: () => void;
}

const NumberButton = ({ number, expectToBePushedNumber, onClick }: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={expectToBePushedNumber > number}>
      {number}
    </StyledButton>
  );
}

export default NumberButton;

const StyledButton = styled.button({
  all: 'unset',
  textAlign: 'center',
  color: 'white',
  backgroundColor: '#3388ff',
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  boxShadow: '0 4px #0000ff',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:disabled': {
    position: 'relative',
    top: '4px',
    backgroundColor: '#ccc',
    boxShadow: 'none'
  }
});
