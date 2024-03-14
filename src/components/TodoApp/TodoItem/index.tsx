import styled from "styled-components";
import Todo from "../todo";

type Props = {
  todo: Todo;
  onClickCheckbox: () => void;
  onClickDelete: () => void;
}

const TodoItem = ({
  todo,
  onClickCheckbox,
  onClickDelete
}: Props) => {

  return (
    <Container>
      <Label $isChecked={todo.checked}>
        <Input
          type='checkbox'
          checked={todo.checked}
          onChange={onClickCheckbox}
        />
        {todo.text}
      </Label>
      <button onClick={onClickDelete}>x</button>
    </Container>
  );
}

export default TodoItem;

const Container = styled.li({
  listStyle: 'none',
  display: 'flex',
  width: '100%'
});

const Input = styled.input({
  marginRight: '8px'
});

const Label = styled.label<{ $isChecked: boolean}>`
  text-decoration: ${props => props.$isChecked ? 'line-through' : 'none'};
  margin-right: auto;
`;
