import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import UploadBox from "./UploadBox";
import Canvas from "./Canvas";
import ColourInfo from "./ColourInfo";
import getSkinTone from "../utils/getSkinTone";

const SkinToneSelector = ({ setImageUploaded, imageUploaded }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [skinTone, setSkinTone] = useState({ emoji: null, tone: null });
  const [lastClickPosition, setLastClickPosition] = useState(null);
  const [sampleSize, setSampleSize] = useState(15);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    img.onload = () => {
      setImageUploaded(true);
      imageRef.current = img;
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImageAndSquare = useCallback(() => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw square if there is a last click position
      if (lastClickPosition) {
        const squareSize = sampleSize;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.strokeRect(
          lastClickPosition.x - squareSize / 2,
          lastClickPosition.y - squareSize / 2,
          squareSize,
          squareSize
        );
      }
    }
  }, [lastClickPosition, canvasRef, imageRef, sampleSize]);

  const handleSampleSizeChange = (newSize) => {
    setSampleSize(newSize);
    drawImageAndSquare();
  };

  useEffect(() => {
    if (imageUploaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.75;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      drawImageAndSquare();
    }
  }, [imageUploaded, lastClickPosition, drawImageAndSquare]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Can't get canvas ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Unable to get 2D context");
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    setLastClickPosition({ x, y });

    const imageData = ctx.getImageData(
      Math.max(0, x - sampleSize / 2),
      Math.max(0, y - sampleSize / 2),
      Math.min(sampleSize, canvas.width - x + sampleSize / 2),
      Math.min(sampleSize, canvas.height - y + sampleSize / 2)
    );

    // Calculate average color
    let r = 0,
      g = 0,
      b = 0;

    // Increment by 4 to skip the alpha channel
    for (let i = 0; i < imageData.data.length; i += 4) {
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
    }
    const pixelCount = imageData.data.length / 4; // Divide by 4 to get the number of pixels in the square

    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    const rgb = `rgb(${r}, ${g}, ${b})`;
    console.log(imageData);
    console.log("Average RGB color:", rgb);

    setSelectedColor(rgb);
    const skinTone = getSkinTone(r, g, b);
    setSkinTone(skinTone);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-slate-950 ${
        imageUploaded ? "justify-center" : "justify-center"
      } md:justify-center`}
    >
      <div className="w-full max-w-4xl p-4 md:p-8">
        {imageUploaded ? (
          <div className="flex flex-col items-center max-h-svh">
            <Canvas
              ref={canvasRef}
              handleCanvasClick={handleCanvasClick}
              className="rounded-xl mb-4"
            />
            <div className="text-center bg-purple-50 p-4 rounded-lg shadow-md w-80 h-38 flex flex-col justify-center">
              <ColourInfo
                selectedColor={selectedColor}
                skinTone={skinTone}
                sampleSize={sampleSize}
                onSampleSizeChange={handleSampleSizeChange}
              />
            </div>
          </div>
        ) : (
          <UploadBox
            handleImageUpload={handleImageUpload}
            ref={fileInputRef}
            title="Select an image to get started"
            prompt="Choose Image"
            subtitle="Supported formats: JPG, PNG, GIF"
          />
        )}
      </div>
    </div>
  );
};

SkinToneSelector.propTypes = {
  setImageUploaded: PropTypes.func.isRequired,
  imageUploaded: PropTypes.bool.isRequired,
};

export default SkinToneSelector;
