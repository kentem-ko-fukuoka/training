import styled from "styled-components";

type Props = {
  className?: string;
  text: string;
  onClick: () => void;
}

const Button = ({ className, text, onClick }: Props) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button`
  all: unset;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  width: 116px;
  height: 32px;
`;
