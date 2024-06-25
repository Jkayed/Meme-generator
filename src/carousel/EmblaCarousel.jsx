import React from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import memeImage1 from "../images/meme/download (18).jpg";
import memeImage2 from "../images/meme/download (19).jpg";
import memeImage3 from "../images/meme/Meme.jpg";
import memeImage4 from "../images/meme/TheSimpsonsMeme.jpg";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <img
            src={memeImage1}
            style={{
              width: "500px",
              height: "200px",
              objectFit: "cover",
              float: "left",
            }}
          />
          <img
            src={memeImage2}
            style={{
              width: "500px",
              height: "200px",
              objectFit: "cover",
              float: "left",
            }}
          />
          <img
            src={memeImage3}
            style={{
              width: "500px",
              height: "200px",
              objectFit: "cover",
              float: "left",
            }}
          />
          <img
            src={memeImage4}
            style={{
              width: "500px",
              height: "200px",
              objectFit: "cover",
              float: "left",
            }}
          />
          {/* {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 9}</div>
            </div>
          ))} */}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
