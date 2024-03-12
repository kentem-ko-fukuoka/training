import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Slideshow from "./Slideshow";
import Thumbnail from "./Thumbnail";

const SLIDE_IMAGE_SOURCES = [
  '../img/pic0.png',
  '../img/pic1.png',
  '../img/pic2.png'
] as const satisfies readonly string[];

const SLIDE_INDEX_INITIAL = 0;
const SLIDE_COUNT = SLIDE_IMAGE_SOURCES.length;

const STYLE_OPACITY_NORMAL = { 'opacity': '1'};
const STYLE_OPACITY_UNDERSTATEMENT = { 'opacity': '.4'};

const toAccurate = (inaccurateSlideIndex: number) => {
  return ((inaccurateSlideIndex % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
}

const testSlideImage = (inaccurateSlideIndex: number) => {
  const slide = screen.getByAltText('スライドに表示される画像');
  expect(slide).toBeInTheDocument();
  expect(slide.getAttribute('src')).toBe(SLIDE_IMAGE_SOURCES[toAccurate(
    inaccurateSlideIndex)]);
}

const testThumbnails = (inaccurateSlideIndex: number) => {

  const thumbnails = screen.getAllByAltText('サムネイルの画像');

  for (let i = 0; i < thumbnails.length; i++) {

    const thumbnail = thumbnails[i];

    if (toAccurate(inaccurateSlideIndex) === i) {
      expect(thumbnail).toHaveStyle(STYLE_OPACITY_NORMAL);
      continue;
    }

    expect(thumbnail).toHaveStyle(STYLE_OPACITY_UNDERSTATEMENT);
  }
}

describe('初期表示', () => {

  test('0番目の画像がスライドに表示される', () => {
    render(<Slideshow />);
    testSlideImage(SLIDE_INDEX_INITIAL);
  });

  test('左右に矢印が向いたボタンが表示される', () => {
    render(<Slideshow />);
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  test('3つのスライドのサムネイルが表示され、表示される画像が正しい', () => {

    render(<Slideshow />);

    const thumbnails = screen.getAllByAltText('サムネイルの画像');

    expect(thumbnails.length).toBe(3);

    thumbnails.forEach((thumbnail, index) => {
      expect(thumbnail.getAttribute('src')).toBe(SLIDE_IMAGE_SOURCES[index]);
    });
  });
});

describe('左右ボタンをクリックした場合の動作', () => {

  const user = userEvent.setup();

  test('右ボタンを押した場合の動作', async () => {

    render(<Slideshow />);

    await user.click(screen.getByText('→'));

    testSlideImage(1);
    testThumbnails(1);
  });

  test('左ボタンを押した場合の動作', async () => {

    render(<Slideshow />);

    await user.click(screen.getByText('→'));
    await user.click(screen.getByText('←'));

    testSlideImage(0);
    testThumbnails(0);
  });

  test('一番左の画像を表示しているときに左ボタンを押した場合の動作', async () => {

    render(<Slideshow />);

    await user.click(screen.getByText('←'));

    testSlideImage(2);
    testThumbnails(2);
  });

  test('一番右の画像を表示しているときに左ボタンを押した場合の動作', async () => {

    render(<Slideshow />);

    await user.click(screen.getByText('→'));
    await user.click(screen.getByText('→'));
    await user.click(screen.getByText('←'));

    testSlideImage(1);
    testThumbnails(1);
  });
});

describe('各サムネイルをクリックした場合の動作', () => {

  const user = userEvent.setup();

  test.each([
    { index: 0 },
    { index: 1 },
    { index: 2 }
  ])('$index番目のサムネイルをクリックした場合の動作', async ({ index }) => {

    render(<Slideshow />);

    const thumbnails = screen.getAllByAltText('サムネイルの画像');

    await user.click(thumbnails[index]);

    testSlideImage(index);
    testThumbnails(index);
  });

  // test('中央のサムネイルをクリックした場合の動作', async () => {

  //   render(<Slideshow />);

  //   const slideIndex = 1;

  //   const thumbnails = screen.getAllByAltText('サムネイルの画像');

  //   await user.click(thumbnails[slideIndex]);

  //   testSlideImage(slideIndex);
  //   testThumbnails(slideIndex);
  // });

  // test('一番右のサムネイルをクリックした場合の動作', async () => {

  //   render(<Slideshow />);

  //   const slideIndex = 2;

  //   const thumbnails = screen.getAllByAltText('サムネイルの画像');

  //   await user.click(thumbnails[slideIndex]);

  //   testSlideImage(slideIndex);
  //   testThumbnails(slideIndex);
  // });
});
