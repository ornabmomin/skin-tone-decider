import { useState, useRef, useEffect, useCallback } from "react";
import UploadBox from "./UploadBox";
import Canvas from "./Canvas";
import ClickPrompt from "./ClickPrompt";
import ColourInfo from "./ColourInfo";
import getSkinTone from "../utils/getSkinTone";

const SkinToneSelector = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [emoji, setEmoji] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [lastClickPosition, setLastClickPosition] = useState(null);

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
      reader.onload = (e) => {
        img.src = e.target.result;
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
        const squareSize = 10;

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
  }, [lastClickPosition, canvasRef, imageRef]);

  useEffect(() => {
    if (imageUploaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      const maxWidth = window.innerWidth * 0.8; // 80% of the viewport width
      const maxHeight = window.innerHeight * 0.75; // 80% of the viewport height
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
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;

    setSelectedColor(rgb);
    const skinTone = getSkinTone(imageData[0], imageData[1], imageData[2]);
    setEmoji(skinTone);

    setLastClickPosition({ x, y });
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
              {emoji === "" ? (
                <ClickPrompt
                  text="Click on the picture to sample a skin tone."
                  className="text-gray-600 text-2xl"
                />
              ) : (
                <ColourInfo selectedColor={selectedColor} emoji={emoji} />
              )}
            </div>
          </div>
        ) : (
          <UploadBox
            handleImageUpload={handleImageUpload}
            ref={fileInputRef}
            title="Upload an image to get started"
            prompt="Choose Image"
            subtitle="Supported formats: JPG, PNG, GIF"
          />
        )}
      </div>
    </div>
  );
};

export default SkinToneSelector;
