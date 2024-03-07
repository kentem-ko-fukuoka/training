import styled from "styled-components";

type Props = {
  src?: string;
}

const Slide = ({ src }: Props) => {
  return (
    <StyledImg
      src={src}
      width={240}
    />
  );
}

export default Slide;

const StyledImg = styled.img`
  vertical-align: bottom;
`;
