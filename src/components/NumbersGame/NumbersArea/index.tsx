import styled from "styled-components";

type Props = {
  numberButtons: JSX.Element[];
}

const NumbersArea = ({ numberButtons }: Props) => {

  return (
    <Container>
      {numberButtons}
    </Container>
  );
}

export default NumbersArea;

const Container = styled.div({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '16px',
});
