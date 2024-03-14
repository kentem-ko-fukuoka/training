import styled from "styled-components";

type Props = {
  onDelete: () => void;
}

const Header = ({ onDelete }: Props) => {
  return (
    <Container>
      <Title>Todos</Title>
      <button onClick={onDelete}>Delete</button>
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
