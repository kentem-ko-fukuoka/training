import styled from "styled-components";

type Props = {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isSecondary?: boolean;
}

const Button = ({
  text,
  onClick,
  isDisabled = false,
  isSecondary = false
}: Props) => {

  return (
    <StyledButton
      onClick={onClick}
      disabled={isDisabled}
      $isSecondary={isSecondary}
    >
      {text}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{ $isSecondary: boolean }>`
  all: unset;
  user-select: none;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.$isSecondary ? '#fecc00' : '#000'};
  background-color: ${props => props.$isSecondary ? '#fff' : '#fecc00'};
  text-align: center;
  width: 7dvw;
  height: 6dvh;
  border: ${props => props.$isSecondary ? '4px solid #fecc00': 'none'};
  border-radius: .5rem;
  box-sizing: border-box;
  transition: background-color 300ms;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: #f4f4f4;
    background-color: #aaa;
  }
`;
