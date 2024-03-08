import styled from "styled-components";
import Button from "../Button";

type Props = {
  onClickLeft: () => void;
  onClickRight: () => void;
}

const ButtonsArea = ({
  onClickLeft,
  onClickRight
}: Props) => {

  return (
    <StyledDiv>
      <Button text='←' onClick={onClickLeft} />
      <Button text='→' onClick={onClickRight} />
    </StyledDiv>
  );
}

export default ButtonsArea;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 240px;
`;
