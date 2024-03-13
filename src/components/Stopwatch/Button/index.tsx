import styled from "styled-components";

type Props = {
  text: string;
  isDisabled: boolean;
  onClick: () => void;
}

const Button = ({ text, isDisabled, onClick }: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={isDisabled}
      $isDisabled={isDisabled}
    >
      {text}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{ $isDisabled: boolean}>`
  all: unset;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background-color: #ddd;
  opacity: ${(props) => props.$isDisabled ? '.6' : '1'};
  width: 80px;
  height: 46px;
  &:hover {
    cursor: pointer;
  }
`;
