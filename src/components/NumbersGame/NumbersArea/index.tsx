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

const Container = styled.div`
  display: grid;
  grid-template: repeat(5, auto) / repeat(5, auto);
  gap: 12px;
  background-color: white;
  border-radius: 4px;
  padding: 16px;
`;
