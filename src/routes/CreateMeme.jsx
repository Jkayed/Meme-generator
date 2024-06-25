import React from "react";
import EmblaCarousel from "../carousel/EmblaCarousel";
import "../css/embla.css";
import "../css/MemeCreator.css";
import PictureDND from "../PictureDND";
const OPTIONS = { align: "start" };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
import MemeCreator from "../memecreator/MemeCreator";
function CreateMeme() {
  return (
    <div className="meme-creator">
      <MemeCreator />
    </div>
  );
}

export default CreateMeme;
