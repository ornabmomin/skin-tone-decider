import { useState, useRef, useEffect } from "react";
import UploadBox from "./UploadBox";
import Canvas from "./Canvas";
import ClickPrompt from "./ClickPrompt";
import ColourInfo from "./ColourInfo";

const SkinToneSelector = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [emoji, setEmoji] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
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

  useEffect(() => {
    if (imageUploaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;
      const maxWidth = window.innerWidth * 0.8; // 80% of the viewport width
      const maxHeight = window.innerHeight * 0.8; // 80% of the viewport height
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
      ctx.drawImage(img, 0, 0, width, height);
    }
  }, [imageUploaded]);

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
  };

  const getSkinTone = (r, g, b) => {
    // Check for non-skin tone colors
    const isNonSkinTone = (r, g, b) => {
      if (r < g || r < b) return true;

      // Define thresholds for non-skin tone detection
      const brightness = (r + g + b) / 3;
      const maxChannel = Math.max(r, g, b);
      const minChannel = Math.min(r, g, b);

      // Conditions for non-skin tone
      if (brightness > 250 || brightness < 10) return true; // Too bright or too dark
      if (maxChannel - minChannel > 170) return true; // High contrast, likely a non-skin color

      return false;
    };

    if (isNonSkinTone(r, g, b)) {
      return "No skin tone detected";
    }

    // Refine skin tone ranges
    if (r > 200 && g > 160 && b > 120) return "🧑🏻‍🦲 (Light)";
    if (r > 180 && g > 140 && b > 100) return "🧑🏼‍🦲 (Medium Light)";
    if (r > 160 && g > 120 && b > 80) return "🧑🏽‍🦲 (Medium)";
    if (r > 120 && g > 80 && b > 60) return "🧑🏾‍🦲 (Medium Dark)";
    return "🧑🏿‍🦲 (Dark)";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950">
      <div className="w-full max-w-4xl p-4 md:p-8">
        {!imageUploaded && (
          <UploadBox
            handleImageUpload={handleImageUpload}
            ref={fileInputRef}
            title="Upload an image to get started"
            prompt="Choose Image"
            subtitle="Supported formats: JPG, PNG, GIF"
          />
        )}
        {imageUploaded && (
          <div className="flex flex-col items-center max-h-svh">
            <Canvas ref={canvasRef} handleCanvasClick={handleCanvasClick} />
            <div className="text-center bg-gray-300 p-6 rounded-lg shadow-md w-80 h-48 flex flex-col justify-center">
              {emoji === "" ? (
                <ClickPrompt text="Click on the picture to sample a skin tone." />
              ) : (
                <ColourInfo selectedColor={selectedColor} emoji={emoji} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinToneSelector;
