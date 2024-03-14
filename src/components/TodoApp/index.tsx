import { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import TodoList from "./TodoList";
import Todo, { createTodo } from "./todo";

const TodoApp = () => {

  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

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

  const handleTodoTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoText(e.target.value);
  };

  const handleClickAddTodo = () => {

    const text = todoText.trim();

    if (text !== '') {
      setTodos(prevTodos => ([...prevTodos, createTodo(text)]));
      setTodoText('');
    }
  };

  return (
    <Main>
      <Header onDelete={handleClickDelete} />
      <TodoList todos={todos} setTodos={setTodos} />
      <Footer
        todoText={todoText}
        onChangeInput={handleTodoTextChange}
        onAddTodo={handleClickAddTodo}
      />
    </Main>
  );
}

export default TodoApp;

const Main = styled.main({
  width: '400px',
  margin: '0 auto'
});
