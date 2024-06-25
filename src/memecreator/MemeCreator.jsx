import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import ImageUpload from "./ImageUpload";
import { Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
const MemeCreator = () => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState("");
  const [draggingItem, setDraggingItem] = useState(null);
  const memeContainerRef = useRef(null);
  const [chosenColor, setChosenColor] = useState("black");

  const fontColors = [
    { key: "red", label: "red" },
    { key: "black", label: "black" },
    { key: "white", label: "white" },
    { key: "orange", label: "orange" },
    { key: "blue", label: "blue" },
    { key: "yellow", label: "yellow" },
    { key: "pink", label: "pink" },
    { key: "green", label: "green" },
  ];

  function selectColorFunction(event) {
    setChosenColor(event.target.value);
  }

  const handleUpload = (imageSrc) => {
    setImages([
      ...images,
      {
        src: imageSrc,
        id: Date.now(),
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 },
      },
    ]);
  };

  const handleAddText = () => {
    if (newText.trim() !== "") {
      setTexts([
        ...texts,
        {
          text: newText,
          id: Date.now(),
          position: { x: 50, y: 50 },
          size: { width: 200, height: 50 },
          fontSize: 25, // Default font size
          color: chosenColor, // Set text color
        },
      ]);
      setNewText("");
    }
  };

  const handleDelete = (id, type) => {
    if (type === "image") {
      setImages(images.filter((image) => image.id !== id));
    } else if (type === "text") {
      setTexts(texts.filter((text) => text.id !== id));
    }
  };

  const handleClearAll = () => {
    setImages([]);
    setTexts([]);
  };

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const { width, height } = memeContainerRef.current.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const drawImages = images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          ctx.drawImage(
            img,
            image.position.x,
            image.position.y,
            image.size.width,
            image.size.height
          );
          resolve();
        };
      });
    });

    Promise.all(drawImages).then(() => {
      texts.forEach((text) => {
        ctx.font = `bold ${text.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = text.color; // Set text color
        ctx.fillText(
          text.text,
          text.position.x + text.size.width / 2,
          text.position.y + text.size.height / 2
        );
      });

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "meme.png";
      link.click();
    });
  };

  const handleMouseDown = (e, index, type) => {
    const bounds = memeContainerRef.current.getBoundingClientRect();
    const offsetX =
      e.clientX -
      bounds.left -
      (type === "image" ? images[index].position.x : texts[index].position.x);
    const offsetY =
      e.clientY -
      bounds.top -
      (type === "image" ? images[index].position.y : texts[index].position.y);
    setDraggingItem({ index, offsetX, offsetY, type });
  };

  const handleMouseMove = (e) => {
    if (draggingItem !== null) {
      const bounds = memeContainerRef.current.getBoundingClientRect();
      const newX = e.clientX - bounds.left - draggingItem.offsetX;
      const newY = e.clientY - bounds.top - draggingItem.offsetY;
      if (draggingItem.type === "image") {
        const newImages = [...images];
        newImages[draggingItem.index] = {
          ...newImages[draggingItem.index],
          position: { x: newX, y: newY },
        };
        setImages(newImages);
      } else if (draggingItem.type === "text") {
        const newTexts = [...texts];
        newTexts[draggingItem.index] = {
          ...newTexts[draggingItem.index],
          position: { x: newX, y: newY },
        };
        setTexts(newTexts);
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <ImageUpload onUpload={handleUpload} />
        <div
          className="meme-container"
          ref={memeContainerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            position: "relative",
            width: "500px",
            height: "500px",
            border: "1px solid black",
          }}
        >
          {images.map((image, index) => (
            <Rnd
              key={image.id}
              bounds="parent"
              size={{ width: image.size.width, height: image.size.height }}
              position={{ x: image.position.x, y: image.position.y }}
              onDragStop={(e, d) => {
                const newImages = [...images];
                newImages[index] = {
                  ...newImages[index],
                  position: { x: d.x, y: d.y },
                };
                setImages(newImages);
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                const newImages = [...images];
                newImages[index] = {
                  ...newImages[index],
                  size: { width: ref.offsetWidth, height: ref.offsetHeight },
                  position,
                };
                setImages(newImages);
              }}
              dragHandleClassName="drag-handle"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  cursor: "move",
                }}
                onMouseDown={(e) => handleMouseDown(e, index, "image")}
              >
                <img
                  src={image.src}
                  alt="uploaded"
                  className="draggable-image"
                  style={{ width: "100%", height: "100%" }}
                />
                <button
                  onClick={() => handleDelete(image.id, "image")}
                  className="delete-button"
                >
                  <CiCircleRemove />
                </button>
              </div>
            </Rnd>
          ))}
          {texts.map((text, index) => (
            <Rnd
              key={text.id}
              bounds="parent"
              size={{ width: text.size.width, height: text.size.height }}
              position={{ x: text.position.x, y: text.position.y }}
              onDragStop={(e, d) => {
                const newTexts = [...texts];
                newTexts[index] = {
                  ...newTexts[index],
                  position: { x: d.x, y: d.y },
                };
                setTexts(newTexts);
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                const newTexts = [...texts];
                const newFontSize = ref.offsetHeight * 0.5; // Adjust the multiplier as needed
                newTexts[index] = {
                  ...newTexts[index],
                  size: { width: ref.offsetWidth, height: ref.offsetHeight },
                  position,
                  fontSize: newFontSize,
                };
                setTexts(newTexts);
              }}
              dragHandleClassName="drag-handle"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  cursor: "move",
                  border: "1px solid transparent",
                }}
                onMouseDown={(e) => handleMouseDown(e, index, "text")}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-5px", // Adjust the position of the top border
                    left: "-5px", // Adjust the position of the left border
                    width: "calc(100% + 10px)", // Adjust the width to include the border width
                    height: "calc(100% + 10px)", // Adjust the height to include the border width
                    border: "1px solid black", // Add border around the text element
                    pointerEvents: "none", // Ensure the border doesn't interfere with mouse events
                    zIndex: -1, // Ensure the border is behind the text
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    overflow: "hidden", // Ensure text doesn't overflow its container
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    color: text.color, // Set text color
                    fontSize: `${text.fontSize}px`,
                    fontWeight: "bold", // Make the text bold
                  }}
                >
                  {text.text}
                </p>
                <button
                  onClick={() => handleDelete(text.id, "text")}
                  className="delete-button"
                >
                  <CiCircleRemove />
                </button>
              </div>
            </Rnd>
          ))}
        </div>

        <Card className="py-4 w-80 h-40 m-auto ml-14 mr-28">
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            size={"sm"}
            type="text"
            label="Enter text"
            className="w-64 ml-7"
          />
          <div style={{ display: "flex" }}>
            <Button
              onClick={handleAddText}
              className="w-48 mt-10 ml-4"
              color="warning"
            >
              Add Text
            </Button>
            <Select
              items={fontColors}
              label="Font color"
              placeholder="Select font color"
              className="w-24 mt-8 ml-3"
              onChange={selectColorFunction}
            >
              {(color) => <SelectItem>{color.label}</SelectItem>}
            </Select>
          </div>
        </Card>
      </div>
      <Card className="py-4 w-80 h-40 m-auto mt-2">
        {" "}
        <Button
          onClick={handleSave}
          color="success"
          endContent={<FaDownload />}
          className="w-60 m-auto"
        >
          Save Meme
        </Button>
        <Button
          onClick={handleClearAll}
          color="danger"
          endContent={<MdDelete />}
          className="w-60 m-auto"
        >
          Clear Images
        </Button>
      </Card>
    </>
  );
};

export default MemeCreator;
