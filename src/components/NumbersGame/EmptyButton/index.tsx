import styled from "styled-components";

const EmptyButton = () => {
  return (
    <StyledButton />
  );
}

export default EmptyButton;

const StyledButton = styled.button({
  all: 'unset',
  position: 'relative',
  top: '4px',
  backgroundColor: '#ccc',
  width: '40px',
  height: '40px',
  borderRadius: '4px'
});
