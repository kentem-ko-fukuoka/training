import styled from "styled-components";
import TodoItem from "../TodoItem";
import Todo from "../todo";

type Props = {
  todos: Todo[];
  setTodos: (
    callbackFnOrNewTodos:
      | ((prevTodos: Todo[]) => Todo[])
      | Todo[],
    ) => void;
}

const TodoList = ({ todos, setTodos }: Props) => {

  if (todos.length === 0) {
    return null;
  }

  return (
    <Ul>
      {
        todos.map((todo) => {

          const handleClickCheckbox = () => {

            const newTodos = todos.map((newTodo) => {

              if (todo.id === newTodo.id) {
                newTodo.checked = !newTodo.checked;
              }

              return newTodo;
            });

            setTodos(newTodos);
          };

          const handleClickDelete = () => {

            if (!window.confirm('Sure?')) {
              return;
            }

            const newTodos = todos.filter((newTodo) => {
              return todo.id !== newTodo.id;
            });

            setTodos(newTodos);
          };

          return (
            <TodoItem
              todo={todo}
              onClickCheckbox={handleClickCheckbox}
              onClickDelete={handleClickDelete}
              key={todo.id}
            />
          );
        })
      }
    </Ul>
  );
}

export default TodoList;

const Ul = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '0'
});
