import styled from "styled-components";

type Props = {
  onClick: () => void
}

const StartButton = ({ onClick }: Props) => {
  return (
    <StyledButton onClick={onClick}>
      START
    </StyledButton>
  );
}

export default StartButton;

const StyledButton = styled.button({
  all: 'unset',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
  backgroundColor: '#f24',
  boxShadow: '0 4px #d11',
  borderRadius: '4px',
  height: '32px',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:active': {
    // TODO
  }
});
