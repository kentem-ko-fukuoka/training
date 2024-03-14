import styled from "styled-components";
import Todo from "../todo";

type Props = {
  todos: Todo[];
  setTodos: (
    callbackFnOrNewTodos:
      | ((prevTodos: Todo[]) => Todo[])
      | Todo[],
  ) => void;
}

const Header = ({ todos, setTodos }: Props) => {

  const handleClickDelete = () => {

    const checkedCount = todos.filter(todo => todo.checked).length;

    if (checkedCount === 0) {
      return;
    }

    if (!window.confirm('Sure?')) {
      return;
    }

    const newTodos = todos.filter((todo) => {
      return !todo.checked;
    });

    setTodos(newTodos);
  };

  return (
    <Container>
      <Title>Todos</Title>
      <button onClick={handleClickDelete}>Delete</button>
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
