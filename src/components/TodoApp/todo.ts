type Todo = {
  id: number;
  text: string;
  checked: boolean;
}

export default Todo;

let todoId = 0;

export const createTodo = (text: string): Todo => {
  return ({
    id: todoId++,
    text,
    checked: false
  });
}
