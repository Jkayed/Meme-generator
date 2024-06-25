// src/components/ImageUpload.js
import React from "react";
import "../css/MemeCreator.css";
import { Card } from "@nextui-org/react";
const ImageUpload = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="py-4 w-80 h-40 m-auto ml-28">
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        id="upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="upload" className="upload-button">
        Upload Image
      </label>
    </div>
      </Card>
  );
};

export default ImageUpload;
