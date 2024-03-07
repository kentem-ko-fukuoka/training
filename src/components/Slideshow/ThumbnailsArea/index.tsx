import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";

type Props = {
  className?: string;
  slideImageSources: readonly string[];
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>
}

const ThumbnailsArea = ({
  className,
  slideImageSources,
  currentSlideIndex,
  setCurrentSlideIndex
}: Props) => {

  const thumbnails = slideImageSources.map((src, index) => {

    const handleClick = () => {
      setCurrentSlideIndex(index);
    }

    return (
      <Thumbnail
        key={src}
        src={src}
        onClick={handleClick}
        isShown={index === currentSlideIndex}
      />
    );
  });

  return (
    <StyledDiv className={className}>
      {thumbnails}
    </StyledDiv>
  );
}

export default ThumbnailsArea;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 240px;
`;
