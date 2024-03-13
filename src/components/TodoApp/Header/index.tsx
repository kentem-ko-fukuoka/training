import styled from "styled-components";

type Props = {
  onPurge: () => void;
}

const Header = ({ onPurge }: Props) => {
  return (
    <Container>
      <Title>Todos</Title>
      <button onClick={onPurge}>Purge</button>
    </Container>
  );
}

export default Header;

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid gray'
});

const Title = styled.h1({
  fontSize: '24px',
});
