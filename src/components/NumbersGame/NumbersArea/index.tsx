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
  grid-template:
    "00 01 02 03 04" 1fr
    "10 11 12 13 14" 1fr
    "20 21 22 23 24" 1fr
    "30 31 32 33 34" 1fr
    "40 41 42 43 44" 1fr
    / 1fr 1fr 1fr 1fr;
  gap: 12px;
  background-color: white;
  border-radius: 4px;
  padding: 16px;
`;
