import React from "react";
import "../css/MemeCreator.css";
const SLIDE_COUNT = 6;
import MemeCreator from "../memecreator/MemeCreator";
function CreateMeme() {
  return (
    <div className="meme-creator">
      <MemeCreator />
    </div>
  );
}

export default CreateMeme;
