import { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import TodoList from "./TodoList";
import Todo from "./todo";

const TodoApp = () => {

  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <Main>
      <Header todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <Footer
        todoText={todoText}
        setTodoText={setTodoText}
        setTodos={setTodos}
      />
    </Main>
  );
}

export default TodoApp;

const Main = styled.main({
  width: '400px',
  margin: '0 auto'
});
