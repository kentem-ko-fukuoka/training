import styled from "styled-components";

type Props = {
  src: string;
  isShown: boolean;
  onClick: () => void;
};

const Thumbnail = ({ src, isShown, onClick }: Props) => {
  return (
    <StyledImg
      src={src}
      width={76}
      onClick={onClick}
      alt='サムネイルの画像'
      $isShown={isShown}
    />
  );
};

export default Thumbnail;

const StyledImg = styled.img<{ $isShown: boolean }>`
  opacity: ${(props) => (props.$isShown ? "1" : ".4")};
  vertical-align: bottom;
  &:hover {
    cursor: pointer;
  }
`;
