import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ButtonsArea from "./ButtonArea";
import Slide from "./Slide";
import ThumbnailsArea from "./ThumbnailArea";

const SLIDE_IMAGE_SOURCES = [
  "../img/pic0.png",
  "../img/pic1.png",
  "../img/pic2.png",
] as const satisfies readonly string[];

const SLIDE_INDEX_INITIAL = 0;

const Slideshow = () => {
  const [currentSlideIndex, setCurrentSlideIndex] =
    useState(SLIDE_INDEX_INITIAL);

  const onClickLeft = () => {
    setCurrentSlideIndex((prev) => {
      const length = SLIDE_IMAGE_SOURCES.length;
      return (prev + length - 1) % length;
    });
  };

  const onClickRight = () => {
    setCurrentSlideIndex((prev) => {
      const length = SLIDE_IMAGE_SOURCES.length;
      return (prev + 1) % length;
    });
  };

  return (
    <>
      <Global />
      <StyledDiv>
        <Slide src={SLIDE_IMAGE_SOURCES[currentSlideIndex]} />
        <ButtonsArea onClickLeft={onClickLeft} onClickRight={onClickRight} />
        <ThumbnailsArea
          slideImageSources={SLIDE_IMAGE_SOURCES}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
        />
      </StyledDiv>
    </>
  );
};

export default Slideshow;

const Global = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 240px;
  padding-top: 8px;
  margin: 0 auto;
`;
