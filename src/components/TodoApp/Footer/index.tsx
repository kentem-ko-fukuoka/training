import { ChangeEventHandler } from "react";
import styled from "styled-components";
import Todo, { createTodo } from "../todo";

type Props = {
  todoText: string;
  setTodoText: (
    callbackFnOrNewTodoText:
      | ((prevTodoText: string) => string)
      | string,
  ) => void;
  setTodos: (
    callbackFnOrNewTodos:
      | ((prevTodos: Todo[]) => Todo[])
      | Todo[],
  ) => void;
}

const Footer = ({
  todoText,
  setTodoText,
  setTodos
}: Props) => {

  const handleChangeTodoText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoText(e.target.value);
  }

  const handleAddTodo = () => {

    const text = todoText.trim();

    if (text !== '') {
      setTodos(prevTodos => ([...prevTodos, createTodo(text)]));
      setTodoText('');
    }
  };

  return (
    <Container>
      <Input
        type='text'
        value={todoText}
        onChange={handleChangeTodoText}
      />
      <Button onClick={handleAddTodo}>Add</Button>
    </Container>
  );
}

export default Footer;

const Container = styled.div({
  display: 'flex',
  gap: '16px',
  height: '28px'
});

const Input = styled.input({
  flexGrow: '15'
});

const Button = styled.button({
  flexGrow: '1'
})
