import styled, { keyframes } from "styled-components";

type Props = {
  imgSources: readonly string[];
  imgIndex: number;
  isDisabled: boolean;
  delay: number;
  onClick: () => void;
}

const SpinControl = ({
  imgSources,
  imgIndex,
  isDisabled,
  delay,
  onClick
}: Props) => {

  return (
    <Container>
      <ImgContainer>
        <ImgBox
          className={isDisabled ? '' : 'spin'}
          $imgIndex={imgIndex}
          $delay={delay}
        >
          <img
            src={imgSources[0]}
            width={90}
            height={110}
            alt='ベルの画像'
          />
          <img
            src={imgSources[1]}
            width={90}
            height={110}
            alt='さくらんぼの画像'
          />
          <img
            src={imgSources[2]}
            width={90}
            height={110}
            alt='7の画像'
          />
        </ImgBox>
      </ImgContainer>
      <StopButton
        disabled={isDisabled}
        onClick={onClick}
        $isDisabled={isDisabled}
      >
        STOP
      </StopButton>
    </Container>
  );
}

export default SpinControl;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
});

const ImgContainer = styled.div({
  position: 'relative',
  fontSize: '0',
  verticalAlign: 'bottom',
  width: '90px',
  height: '110px',
  overflow: 'hidden'
});

const spin = keyframes({
  from: {
    top: '0px'
  },
  to: {
    top: '-220px'
  }
});

const ImgBox = styled.div<{ $imgIndex:number, $delay: number}>`
  position: absolute;
  top: ${props => props.$imgIndex * -110}px;
  width: 90px;
  height: 330px;
  &.spin {
    animation: ${spin} 100ms ${props => props.$delay}ms infinite;
  }
`;

const StopButton = styled.button<{ $isDisabled: boolean }>`
  all: unset;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: #ff1111;
  opacity: ${props => props.$isDisabled ? '.5' : '1'};
  border-radius: 16px;
  box-shadow: 0 4px 0 #bb1111;
  width: 90px;
  height: 32px;
  line-height: 32px;
  &:hover {
    cursor: pointer;
  }
`;
