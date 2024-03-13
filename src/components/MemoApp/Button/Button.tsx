import styled from "styled-components";

type Props = {
  className?: string;
  text: string;
  onClick: () => void;
}

const Button = ({
  className,
  text, 
  onClick
}: Props) => {

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
  width: 3.8rem;
  height: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
