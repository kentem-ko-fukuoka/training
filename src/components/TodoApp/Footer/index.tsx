import { ChangeEventHandler } from "react";
import styled from "styled-components";

type Props = {
  todoText: string;
  onChangeInput: ChangeEventHandler<HTMLInputElement>;
  onAddTodo: () => void;
}

const Footer = ({
  todoText,
  onChangeInput,
  onAddTodo
}: Props) => {

  return (
    <Container>
      <Input
        type='text'
        value={todoText}
        onChange={onChangeInput}
      />
      <Button onClick={onAddTodo}>Add</Button>
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
