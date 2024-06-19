import { useState, useRef, useEffect } from "react";

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
      const maxWidth = window.innerWidth * 0.8; // 90% of the viewport width
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
    if (r > 200 && g > 160 && b > 120) return "🧑🏻‍🦲 (Light)";
    if (r > 180 && g > 140 && b > 100) return "🧑🏼‍🦲 (Medium Light)";
    if (r > 160 && g > 120 && b > 80) return "🧑🏽‍🦲 (Medium)";
    if (r > 120 && g > 80 && b > 60) return "🧑🏾‍🦲 (Medium Dark)";
    return "🧑🏿‍🦲 (Dark)";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-4 md:p-8">
        {!imageUploaded && (
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Please upload an image</p>
            <label
              htmlFor="fileInput"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Upload Image
            </label>
            <input
              id="fileInput"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}
        {imageUploaded && (
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="border border-gray-300 rounded-md mb-4"
            ></canvas>
            <div className="text-center">
              <p className="text-gray-600">Selected Color: {selectedColor}</p>
              <p className="text-gray-600 text-2xl">Suggested Emoji:</p>
              <p className="text-gray-600 text-4xl">{emoji}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinToneSelector;
